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
  templateUrl: `./register.component.html`,
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // 🔥 highlight all errors
      return;
    }

    this.auth.register(this.form.value).subscribe({
      next: (res: any) => {
        console.log('Backend response:', res);
        // Visa texten från backend, eller fallback
        this.message = res?.text || 'Registrering lyckades!';
        // Navigera till login efter en kort stund
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.message = err.error?.error || 'Registrering misslyckades';
      },
    });
  }
}
