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
  templateUrl: `../quotes/quotes.component.html`,
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
