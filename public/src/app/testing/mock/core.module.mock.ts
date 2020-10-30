import { SocialLoginModule } from 'angularx-social-login';
import { CookieModule } from 'ngx-cookie';
import { ToastrModule } from 'ngx-toastr';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { MockApiService } from './api.service.mock';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { AuthGuardService } from '../../core/services/auth-guard.service';
import { AppService } from '../../core/services/app.service';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from '../../core/components/header/header.component';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { AppHttpInterceptor } from '../../core/app-http.interceptor';
import { RequestsService } from '../../core/services/requests.service';

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
    SharedModule,
    SocialLoginModule,
    RouterTestingModule,
  ],
  declarations: [HeaderComponent, FooterComponent],
  providers: [
    {
      useClass: MockApiService,
      provide: ApiService,
    },
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
  exports: [HeaderComponent, FooterComponent, LoadingBarModule, ToastrModule, SocialLoginModule],
})
export class MockCoreModule {}
