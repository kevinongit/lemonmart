// import * as decode from 'jwt-decode'
import decode from 'jwt-decode'
import { transformError } from '../common/common'

import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, pipe, throwError } from 'rxjs'
import { catchError, filter, flatMap, map, tap } from 'rxjs/operators'
import { IUser, User } from '../user/user/user'
import { Role } from './auth.enum'
import { CacheService } from './cache.service'

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

export interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>

  login(email: string, password: string): Observable<void>
  logout(clearToken?: boolean): void
  getToken(): string
}

@Injectable()
export abstract class AuthService extends CacheService implements IAuthService {
  private getAndUpdateUserIfAuthenticated = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    flatMap(() => this.getCurrentUser()),
    map((user: IUser) => this.currentUser$.next(user)),
    catchError(transformError),
  )
  protected abstract authProvider(
    email: string,
    password: string,
  ): Observable<IServerAuthResponse>
  protected abstract transformJwtToken(token: unknown): IAuthStatus
  protected abstract getCurrentUser(): Observable<User>

  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(
    this.getItem('authStatus') ?? defaultAuthStatus
  )
  readonly currentUser$ =
    new BehaviorSubject<IUser>(new User())
  protected readonly resumeCurrentUser$ = this.authStatus$.pipe(
    this.getAndUpdateUserIfAuthenticated
  )

  constructor() {
    super()
    console.log('11111')
    if (this.hasExpiredToken()) {
      console.log('22222')
      this.logout(true)
    } else {
      console.log('44444')
      const token = this.getAuthStatusFromToken();
      console.log(`constructor token(${token}) from cache`)
      this.authStatus$.next(token);
      // this.authStatus$.next(this.getAuthStatusFromToken())
      /// To load user on brower refresh,
      /// resume pipeline must activate on the next cycle
      /// Which allows for all services to constructed properly
      setTimeout(() => this.resumeCurrentUser$.subscribe(), 0)
    }
  }



  login(email: string, password: string): Observable<void> {
    this.clearToken()

    console.log(`email(${email},password(${password}))`)
    const loginResponse$ = this.authProvider(email, password)
      .pipe(
        map((value) => {
          console.log(`value=${JSON.stringify(value)}`)
          this.setToken(value.accessToken)
          const token = decode(value.accessToken)
          return this.transformJwtToken(token)
        }),
        tap((status) => {
          console.log(`status=${JSON.stringify(status)}`)
          return this.authStatus$.next(status)
        }),
        this.getAndUpdateUserIfAuthenticated,

      )
    loginResponse$.subscribe({
      error: err => {
        this.logout()
        return throwError(err)
      },
    })

    return loginResponse$
  }

  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken()
    }
    /// Note that the use of setTimeout, which allows us to avoid timing issues
    /// when core elements of the application are all changing statuses at once.
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0)
  }

  protected setToken(jwt: string) {
    this.setItem('jwt', jwt)
  }

  getToken(): string {
    return this.getItem('jwt') ?? ''
  }

  protected clearToken() {
    this.removeItem('jwt')
  }

  protected hasExpiredToken(): boolean {
    console.log('xxxxx')
    const jwt = this.getToken()
    console.log(`het - jwt(${jwt})`)
    if (jwt) {
      const payload = decode(jwt) as any
      console.log(`payload(${payload})`)
      return Date.now() >= payload.exp * 1000
    }
    return true
  }

  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transformJwtToken(decode(this.getToken()))
  }
}
