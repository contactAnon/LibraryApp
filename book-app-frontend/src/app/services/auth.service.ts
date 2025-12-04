import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5267/api/auth';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  // === REGISTER =======================================
  register(data: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // === LOGIN ===========================================
  login(data: { username: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, data).pipe(
      tap((res) => {
        console.log('Backend returned token:', res.token);

        localStorage.setItem('token', res.token);

        console.log('Token saved to localStorage:', this.getToken());

        this.isLoggedInSubject.next(true);
      })
    );
  }

  // === LOGOUT ==========================================
  logout() {
    console.log('Clearing token...');
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  // === TOKEN HELPERS ===================================
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  decodeToken() {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded: any = this.decodeToken();
    const now = Date.now().valueOf() / 1000;
    return decoded && decoded.exp && decoded.exp > now;
  }
}
