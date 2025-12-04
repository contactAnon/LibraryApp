// src/app/components/add-book/add-book.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { ThemeToggleComponent } from '../theme/theme-toggle.component';
@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ThemeToggleComponent],
  templateUrl: `./addbook.component.html`,
})
export class AddBookComponent implements OnInit {
  form!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    if (!this.auth.isTokenValid()) {
      this.auth.logout();
      this.router.navigate(['/']);
    }
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.bookService.addBook(this.form.value).subscribe({
      next: (res) => {
        console.log('Book added:', res);
        this.router.navigate(['/landing']);
      },
      error: (err) => {
        console.error('Add book error:', err);
        this.errorMessage = err.error || 'Misslyckades att lägga till bok';
      },
    });
  }
}
