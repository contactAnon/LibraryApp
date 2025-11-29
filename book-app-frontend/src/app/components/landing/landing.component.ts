import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="navbar navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand">My Book App</a>
        <button class="btn btn-primary" (click)="goLogin()">Logga in</button>
      </div>
    </header>

    <section class="hero text-center mt-5">
      <h1>Välkommen till din boksamling</h1>
      <button class="btn btn-success btn-lg mt-3" (click)="addBook()">
        Lägg till en ny bok
      </button>
    </section>
  `,
})
export class LandingComponent {
  constructor(private router: Router, private auth: AuthService) {}

  goLogin() {
    this.router.navigate(['/login']);
  }

  addBook() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/book-form']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
