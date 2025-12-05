import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { ThemeToggleComponent } from '../theme/theme-toggle.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  templateUrl: './landing.component.html',
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

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
