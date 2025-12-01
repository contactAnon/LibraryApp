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

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Lägg till en ny bok</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="title" placeholder="Titel" />
      <input type="text" formControlName="author" placeholder="Författare" />
      <input
        type="date"
        formControlName="publicationDate"
        placeholder="Publiceringsdatum"
      />
      <button type="submit">Spara</button>
    </form>
    <p *ngIf="errorMessage">{{ errorMessage }}</p>
  `,
})
export class AddBookComponent implements OnInit {
  form!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {
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
