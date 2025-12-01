import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-quote',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <h2>Lägg till nytt citat</h2>
    <form (ngSubmit)="save()">
      <label
        >Text: <input [(ngModel)]="quote.text" name="text" required /></label
      ><br />
      <label>Author: <input [(ngModel)]="quote.author" name="author" /></label
      ><br />
      <button type="submit">Spara</button>
    </form>
  `,
})
export class AddQuoteComponent {
  quote: Quote = { text: '', author: '' };

  constructor(private quoteService: QuoteService, private router: Router) {}

  save() {
    this.quoteService
      .addQuote(this.quote)
      .subscribe(() => this.router.navigate(['/quotes']));
  }
}
