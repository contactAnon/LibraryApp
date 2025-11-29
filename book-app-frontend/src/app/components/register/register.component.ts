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
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Register</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="username" placeholder="Username" />
      <input
        type="password"
        formControlName="password"
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
    <p *ngIf="errorMessage">{{ errorMessage }}</p>
  `,
})
export class RegisterComponent implements OnInit {
  form!: FormGroup; // <-- använd "!" för att säga till TS att den initieras senare
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

    this.authService.register(this.form.value).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) =>
        (this.errorMessage = err.error || 'Registrering misslyckades'),
    });
  }
}
