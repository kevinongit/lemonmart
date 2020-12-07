import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { MaterialModule } from './material.module'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

import { AuthService } from './auth/auth.service'
// import { InMemoryAuthService } from './auth/auth.inmemory.service'
// import { FirebaseAuthService } from './auth/auth.firebase.service'
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { LoginComponent } from './login/login.component';
import { SimpleDialogComponent } from './common/simple-dialog.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component'
import { AngularFireModule, FirebaseApp } from '@angular/fire'
import { environment } from 'src/environments/environment'
import { authFactory } from './auth/auth.factory'
import { AngularFireAuth } from '@angular/fire/auth'


@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    SimpleDialogComponent,
    NavigationMenuComponent
  ],
  providers: [
    {
      provide: AuthService,
      useFactory: authFactory,
      deps: [AngularFireAuth],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
