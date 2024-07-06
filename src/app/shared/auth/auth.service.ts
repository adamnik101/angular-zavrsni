import { Injectable } from '@angular/core';
import { ICredentials } from '../interfaces/i-credentials';
import { ApiService } from '../base-logic/api/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../core/config/api-endpoints';
import { Observable } from 'rxjs';
import { UserService } from '../../core/user/services/user/user.service';
import { IUser } from '../../core/interfaces/user/i-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService<any>{

  constructor(
    http: HttpClient,
    private userService: UserService
  ) {
    super(API_ENDPOINTS.auth.login, http);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(credentials: ICredentials): Observable<any> {
    return this.post(credentials);
  }
  
  logout(): void {
    this.userService.setUserData({} as IUser);
    this.userService.loggedIn.set(false);
  }
  getUserData(): Observable<any> {
    return this.getWithOverideEndpoint('auth/me')
  }

}
