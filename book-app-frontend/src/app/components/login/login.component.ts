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
  templateUrl: `../login/login.component.html`,
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
