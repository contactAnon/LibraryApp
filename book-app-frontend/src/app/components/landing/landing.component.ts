import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header>
      <button
        *ngIf="!(auth.isLoggedIn$ | async)"
        (click)="router.navigate(['/login'])"
      >
        Login
      </button>
      <button *ngIf="auth.isLoggedIn$ | async" (click)="auth.logout()">
        Logout
      </button>
    </header>
    <section>
      <h1>Welcome to Book App</h1>
      <button (click)="addBook()">Lägg till en ny bok</button>
    </section>
  `,
})
export class LandingComponent {
  constructor(public auth: AuthService, private router: Router) {}

  addBook() {
    if (this.auth.getToken()) {
      this.router.navigate(['/add-book']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
