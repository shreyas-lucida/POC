import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ActionResponse, LoginActionResponse, UserProfile } from '../../../../shared/models';
import { environment } from '../../../environments/environment';
import * as XLSX from 'xlsx';
@Injectable()
export class ApiService {
  activeCategory;
  excelData: any;
  constructor(private httpService: HttpClient) {
    this.activeCategory = new BehaviorSubject(null);
  }

  get serverUrl(): string {
    return environment.apiServer;
  }

  get apiUrl(): string {
    return `${this.serverUrl}/api`;
  }

  getApiEndpoint(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}`;
  }

  login(username: string, password: string): Observable<LoginActionResponse> {
    const url = this.getApiEndpoint(`login`);

    return this.httpService.post<LoginActionResponse>(url, {
      username,
      password
    });
  }

  socialLogin(provider: string, authToken: string): Observable<LoginActionResponse> {
    const url = this.getApiEndpoint(`social-login/${provider}`);
    return this.httpService.get<LoginActionResponse>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        access_token: `${authToken}`
      },
      withCredentials: true
    });
  }

  register(user: UserProfile): Observable<UserProfile> {
    const url = this.getApiEndpoint('register/');
    return this.httpService.post<UserProfile>(url, user);
  }

  logout(): Observable<ActionResponse<null>> {
    const url = this.getApiEndpoint('logout/');
    return this.httpService.get<ActionResponse<null>>(url);
  }

  getProfile(): Observable<UserProfile> {
    const url = this.getApiEndpoint(`profile/`);
    return this.httpService.get<UserProfile>(url);
  }

  testPOC(): Observable<any> {
    const url = this.getApiEndpoint(`test/`);
    return this.httpService.get<any>(url);
  }

  setCategory(category) {
    this.activeCategory.next(category)
  }
  getCategory() {
    return this.activeCategory.asObservable();
  }
  uploadFile(formdata) {
    const url = this.getApiEndpoint(`storage`);
    let headers: any = {
      "Access-Control-Allow-Origin": "*"
    }
    return this.httpService.post<any>(url, formdata, headers);
  }
}
