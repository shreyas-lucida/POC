import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { AuthGuardService } from './core/services/auth-guard.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { SubcatagoryComponent } from './components/sub-catagory/sub-catagory.component';
import { LoginComponent } from './components/login/login.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { settingsComponent } from './components/settings/settings.component'
import { UserSearchComponent } from './components/user-search/user-search.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoaderService } from './components/providers/loaderService';
import { environment } from '../environments/environment';
import { Configuration } from 'msal';
import {
  MsalModule,
  MsalInterceptor,
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
  MsalService,
  MsalAngularConfiguration
} from '@azure/msal-angular';
import { MsalGuard } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: environment.clientId,
      authority: environment.authority,
      validateAuthority: true,
      redirectUri: environment.redirectUrl,
      postLogoutRedirectUri: environment.redirectUrl,
      navigateToLoginRequestUrl: true
    },
    cache: {
      storeAuthStateInCookie: false,
    }
  };
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: false
  };
}

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
    canActivate: [MsalGuard]
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'category',
    pathMatch: 'full',
    component: SubcatagoryComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'reports-search',
    component: UserSearchComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'settings',
    component: settingsComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'id_token',
    component: HomePageComponent,
    canActivate: [MsalGuard]
  },
  
];

@NgModule({
  declarations: [
    AppComponent,
    UserSearchComponent,
    SubcatagoryComponent,
    LoginComponent,
    ReportsComponent,
    SidebarComponent,
    HomePageComponent,
    SpinnerComponent,
    settingsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'app-root' }),
    CommonModule,
    NgtUniversalModule,
    SharedModule,
    CoreModule,
    RouterModule.forRoot(routes, { enableTracing: false, initialNavigation: 'enabled' }),
    FormsModule,
    MsalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    MsalService,
    LoaderService
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

