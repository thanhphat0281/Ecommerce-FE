import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(body:any): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',body,
      {
        observe:'body',
        headers:new HttpHeaders().append('Content-Type','application/json')
      }
    );
  }

  register(body:any): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',body,{
        observe:'body',
        headers:new HttpHeaders().append('Content-Type','application/json')
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}
