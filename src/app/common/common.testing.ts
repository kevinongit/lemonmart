import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SecurityContext } from '@angular/core'
import { MediaChange } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { SafeResourceUrl, SafeValue, } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable, Subscription, of } from 'rxjs'

import { MaterialModule } from '../material.module'

import { autoSpyObj } from 'angular-unit-test-helper'
import { AuthService } from '../auth/auth.service'
import { UiService } from './ui.service'

const FAKE_SVGS = {
  lemon: '<svg><path id="lemon" name="lemon"></path></svg>',
}

export class MediaObserverFake {
  isActive(query: string): boolean {
    return false
  }

  asObservable(): Observable<MediaChange> {
    return of({} as MediaChange)
  }

  subscribe(
    next?: (value: MediaChange) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {
    return new Subscription()
  }
}

export class MatIconRegisryFake {
  // tslint:disable-next-line: variable-name
  _document = document
  addSvgIcon(iconName: string, url: SafeResourceUrl): this {
    // this.addSvgIcon('lemon', 'lemon.svg')
    return this
  }

  getNamedSvgIcon(name: string, namespace: string = ''): Observable<SVGElement> {
    return of(this._svgElementFromString(FAKE_SVGS.lemon))
  }

  private _svgElementFromString(str: string): SVGElement {
    const div = (this._document || document).createElement('DIV')
    div.innerHTML = str
    const svg = div.querySelector('svg') as SVGElement
    if (!svg) {
      throw Error('<svg>tag not found')
    }
    return svg
  }
}

export class DomSanitizerFake {
  bypassSecurityResourceUrl(url: string): SafeResourceUrl {
    return {} as SafeResourceUrl
  }
  sanitize(context: SecurityContext, value: SafeValue | string | null): string | null {
    return value?.toString() || null
  }
}

export const CommonTestingProviders: any[] = [
  // Intentionally Left Blank!!!
  { provide: AuthService, useValue: autoSpyObj(AuthService) },
  { provide: UiService, useValue: autoSpyObj(UiService) },
]

export const CommonTestingModules: any[] = [
  ReactiveFormsModule,
  MaterialModule,
  NoopAnimationsModule,
  HttpClientTestingModule,
  RouterTestingModule,
]
