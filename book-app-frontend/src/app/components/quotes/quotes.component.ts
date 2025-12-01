import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../services/quote.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Quote } from '../../models/quote.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quotes',
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
      <button
        *ngIf="auth.isLoggedIn$ | async"
        (click)="auth.logout(); router.navigate(['/'])"
      >
        Logout
      </button>
      <nav *ngIf="auth.isLoggedIn$ | async">
        <button (click)="router.navigate(['/books'])">Böcker</button>
        <button (click)="router.navigate(['/quotes'])">Mina citat</button>
      </nav>
    </header>

    <section *ngIf="auth.isLoggedIn$ | async">
      <h2>Mina citat</h2>
      <button (click)="router.navigate(['/add-quote'])">
        Lägg till nytt citat
      </button>

      <ul *ngIf="quotes.length > 0">
        <li *ngFor="let quote of quotes" class="quote-item">
          <strong>{{ quote.text }}</strong> — {{ quote.author }}
          <button (click)="editQuote(quote.id!)">Redigera</button>
          <button (click)="deleteQuote(quote.id!)">Radera</button>
        </li>
      </ul>
      <p *ngIf="quotes.length === 0">Du har inga citat ännu.</p>
    </section>
    <p *ngIf="!(auth.isLoggedIn$ | async)">Logga in för att se dina citat.</p>
  `,
})
export class QuotesComponent implements OnInit {
  quotes: Quote[] = [];

  constructor(
    public quoteService: QuoteService,
    public auth: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
    this.quoteService.getQuotes().subscribe({
      next: (res) => (this.quotes = res.slice(0, 5)), // visa max 5 citat
      error: (err) => console.error(err),
    });
  }

  addQuote() {
    this.router.navigate(['/add-quote']);
  }

  editQuote(id: number) {
    this.router.navigate(['/edit-quote', id]);
  }

  deleteQuote(id: number) {
    this.quoteService.deleteQuote(id).subscribe(() => this.loadQuotes());
  }
}
