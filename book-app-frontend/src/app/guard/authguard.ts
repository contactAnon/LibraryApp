import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.auth.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const decoded: any = this.auth.decodeToken();
    const now = Date.now().valueOf() / 1000; // current time in seconds

    if (decoded?.exp && decoded.exp < now) {
      // token expired
      this.auth.logout();
      this.router.navigate(['/login']);
      return false;
    }

    return true; // token exists and is not expired
  }
}
