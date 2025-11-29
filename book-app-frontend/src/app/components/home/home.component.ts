import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../../services/book.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="navbar navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand">My Book App</a>
        <button class="btn btn-danger" (click)="logout()">Logga ut</button>
      </div>
    </header>

    <div class="container mt-4">
      <h2>Din Boksamling</h2>
      <button class="btn btn-success mb-3" (click)="addBook()">
        Lägg till ny bok
      </button>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Författare</th>
            <th>Publiceringsdatum</th>
            <th>Åtgärder</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let book of books">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.publicationDate | date : 'yyyy-MM-dd' }}</td>
            <td>
              <button
                class="btn btn-primary btn-sm me-2"
                (click)="editBook(book.id)"
              >
                Redigera
              </button>
              <button
                class="btn btn-danger btn-sm"
                (click)="deleteBook(book.id)"
              >
                Radera
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p *ngIf="books.length === 0">Du har inga böcker ännu.</p>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (res) => (this.books = res),
      error: (err) => console.error('Kunde inte ladda böcker', err),
    });
  }

  addBook() {
    this.router.navigate(['/book-form']);
  }

  editBook(id?: number) {
    if (id) this.router.navigate(['/book-form', id]);
  }

  deleteBook(id?: number) {
    if (id && confirm('Är du säker på att du vill radera boken?')) {
      this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
    }
  }

  logout() {
    this.auth.logout();
  }
}
