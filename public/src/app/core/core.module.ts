import { CookieModule } from 'ngx-cookie';
import { ToastrModule } from 'ngx-toastr';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { SharedModule } from '../shared/shared.module';
import { AppHttpInterceptor } from './app-http.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AppService } from './services/app.service';
import { RequestsService } from './services/requests.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    LoadingBarModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
    }),
    RouterModule,
    SharedModule,
  ],
  declarations: [HeaderComponent, FooterComponent],
  providers: [
    ApiService,
    AuthService,
    AuthGuardService,
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
    RequestsService,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingBarModule,
    ToastrModule
  ],
})
export class CoreModule {}
