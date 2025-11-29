import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-5">
      <h2>Logga in</h2>
      <form (ngSubmit)="login()">
        <input
          class="form-control mb-2"
          type="text"
          placeholder="Användarnamn"
          [(ngModel)]="username"
          name="username"
          required
        />
        <input
          class="form-control mb-2"
          type="password"
          placeholder="Lösenord"
          [(ngModel)]="password"
          name="password"
          required
        />
        <button class="btn btn-primary" type="submit">Logga in</button>
      </form>
      <p class="text-danger mt-2">{{ error }}</p>
      <a routerLink="/register">Har du inget konto? Registrera här</a>
    </div>
  `,
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => (this.error = 'Fel användarnamn eller lösenord'),
    });
  }
}
