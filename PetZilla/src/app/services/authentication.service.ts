import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDetails, TokenResponse, TokenPayload } from '../model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(data: TokenResponse): void {
    if (data.token && data.user) {
    localStorage.setItem('mean-token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    this.token = data.token;
  }
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    window.localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  private request(method: 'post'|'get', type: 'login'|'register'|'profile'|'confirm', user?: TokenPayload): Observable<any> {
    let base;
    if (method === 'post') {
      base = this.http.post(`http://localhost:3000/auth/${type}`, user);
    } else {
      base = this.http.get(`http://localhost:3000/auth/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data) {
          console.log(data);
          this.saveToken(data);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public confirmMail(userObj): Observable<any> {
    return this.request('post', 'confirm', userObj);
  }



}
