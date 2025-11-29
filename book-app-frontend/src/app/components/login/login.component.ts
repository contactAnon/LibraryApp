/* import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Login</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="username" placeholder="Username" />
      <input
        type="password"
        formControlName="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
    <p *ngIf="errorMessage">{{ errorMessage }}</p>
  `,
})
export class LoginComponent implements OnInit {
  form!: FormGroup; // Initieras i ngOnInit
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.authService
      .login(this.form.value as { username: string; password: string })
      .subscribe({
        next: () => this.router.navigate(['/landing']),
        error: (err) =>
          (this.errorMessage = err.error || 'Fel användarnamn eller lösenord'),
      });
  }
}
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Login</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="username" placeholder="Username" />
      <input
        type="password"
        formControlName="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>

    <p *ngIf="errorMessage">{{ errorMessage }}</p>

    <!-- Registrera knapp -->
    <p>
      Har du inget konto?
      <button type="button" (click)="goToRegister()">Registrera här</button>
    </p>
  `,
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.authService
      .login(this.form.value as { username: string; password: string })
      .subscribe({
        next: (res) => {
          console.log(
            'Login successful, token should be stored now:',
            res.token
          );
          this.router.navigate(['/landing']);
        },
        error: (err) =>
          (this.errorMessage = err.error || 'Fel användarnamn eller lösenord'),
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
