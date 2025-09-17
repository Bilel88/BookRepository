import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';

import { AppComponent } from './app';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ActivateAccount } from './pages/activate-account/activate-account';
import { CodeInputModule } from 'angular-code-input';

import { httpTokenInterceptor } from './services/interceptor/http-token-interceptor';
import { loggingInterceptor } from './interceptors/logging-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    Login,
    Register,
    ActivateAccount
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CodeInputModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([
        httpTokenInterceptor,
        loggingInterceptor
      ])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
