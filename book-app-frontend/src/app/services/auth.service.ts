import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'jwtToken';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem(this.tokenKey)
  );
  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {}

  register(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.token);
        this._isLoggedIn$.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this._isLoggedIn$.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
