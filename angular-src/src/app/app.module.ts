import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { AuthGuardService } from '@services';

import { AppComponent } from './app.component';
import { ExamplePageComponent } from './components/example-page/example-page.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'example',
    pathMatch: 'full',
    component: ExamplePageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'user/:search',
    component: UserPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'user-search',
    component: UserSearchComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home-page',
    component: HomePageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin',
    component: UserPageComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin'] },
  },
];

@NgModule({
  declarations: [
    AppComponent,
    UserSearchComponent,
    HomeComponent,
    ExamplePageComponent,
    LoginComponent,
    UserPageComponent,
    RegisterComponent,
    SidebarComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'app-root' }),
    CommonModule,
    NgtUniversalModule,
    SharedModule,
    CoreModule,
    RouterModule.forRoot(routes, { enableTracing: false, initialNavigation: 'enabled' }),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
