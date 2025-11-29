import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-5">
      <h2>Registrera ny användare</h2>
      <form (ngSubmit)="register()">
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
        <button class="btn btn-success" type="submit">Registrera</button>
      </form>
      <p class="text-danger mt-2">{{ error }}</p>
      <p class="text-success mt-2">{{ success }}</p>
      <a routerLink="/login">Tillbaka till logga in</a>
    </div>
  `,
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';
  success = '';

  constructor(private auth: AuthService) {}

  register() {
    this.auth
      .register({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          this.success = 'Registrering lyckad! Logga in.';
          this.error = '';
        },
        error: (err) => {
          this.error = err.error || 'Registrering misslyckades';
          this.success = '';
        },
      });
  }
}
