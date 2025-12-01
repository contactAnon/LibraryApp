import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header>
      <button
        *ngIf="!(auth.isLoggedIn$ | async)"
        (click)="router.navigate(['/login'])"
      >
        Login
      </button>
      <button *ngIf="auth.isLoggedIn$ | async" (click)="auth.logout()">
        Logout
      </button>
    </header>

    <section>
      <h1>Welcome to Book App</h1>
      <button (click)="addBook()">Lägg till en ny bok</button>
    </section>
    <ng-container *ngIf="auth.isLoggedIn$ | async">
      <button (click)="router.navigate(['/'])">Böcker</button>
      <button (click)="router.navigate(['/quotes'])">Mina citat</button>
    </ng-container>

    <h2 *ngIf="isLoggedIn">Dina böcker</h2>

    <ul *ngIf="isLoggedIn && books.length > 0">
      <li *ngFor="let book of books" class="book-item">
        <strong>{{ book.title }}</strong>
        <div>{{ book.author }}</div>
        <div>{{ book.publicationDate | date : 'mediumDate' }}</div>
        <button (click)="editBook(book.id)">Redigera</button>
        <button (click)="deleteBook(book.id)">Radera book</button>
      </li>
    </ul>
    <p *ngIf="isLoggedIn && books.length === 0">Du har inga böcker ännu.</p>
    <p *ngIf="!isLoggedIn">Logga in för att se dina böcker.</p>
  `,
})
export class LandingComponent {
  books: any[] = [];
  isLoggedIn = false;
  constructor(
    public auth: AuthService,
    public router: Router,
    private bookService: BookService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    // Prenumerera på login-status
    this.auth.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (status) {
        this.loadBooks();
      } else {
        this.books = [];
      }
    });
  }

  addBook() {
    if (this.isLoggedIn) {
      this.router.navigate(['/add-book']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.auth.logout();
    this.books = []; // Töm listan
    this.router.navigate(['/']);
  }
  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (res: any) => (this.books = res),
      error: (err) => console.error(err),
    });
  }
  editBook(id: number) {
    this.router.navigate(['/edit-book', id]);
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe({
      next: () => this.loadBooks(), // uppdatera listan
      error: (err) => console.error(err),
    });
  }
}
