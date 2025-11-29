import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService, Book } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2>{{ isEditMode ? 'Redigera Bok' : 'Lägg till Ny Bok' }}</h2>
      <form [formGroup]="bookForm" (ngSubmit)="submit()">
        <input
          class="form-control mb-2"
          formControlName="title"
          placeholder="Titel"
        />
        <input
          class="form-control mb-2"
          formControlName="author"
          placeholder="Författare"
        />
        <input
          class="form-control mb-2"
          formControlName="publicationDate"
          type="date"
        />
        <button class="btn btn-success" type="submit">
          {{ isEditMode ? 'Uppdatera' : 'Lägg till' }}
        </button>
        <button class="btn btn-secondary ms-2" type="button" (click)="cancel()">
          Avbryt
        </button>
      </form>
    </div>
  `,
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  bookId?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationDate: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      this.bookId = +params['id'];
      if (this.bookId) {
        this.isEditMode = true;
        this.loadBook(this.bookId);
      }
    });
  }

  loadBook(id: number) {
    this.bookService.getBooks().subscribe((books) => {
      const book = books.find((b) => b.id === id);
      if (book) {
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          publicationDate: book.publicationDate.split('T')[0],
        });
      }
    });
  }

  submit() {
    if (this.bookForm.invalid) return;

    const book: Book = { ...this.bookForm.value, id: this.bookId };

    if (this.isEditMode) {
      this.bookService
        .updateBook(book)
        .subscribe(() => this.router.navigate(['/home']));
    } else {
      this.bookService
        .addBook(book)
        .subscribe(() => this.router.navigate(['/home']));
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
