import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-quote',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <h2>Redigera citat</h2>
    <form *ngIf="quote" (ngSubmit)="save()">
      <label
        >Text: <input [(ngModel)]="quote.text" name="text" required /></label
      ><br />
      <label>Author: <input [(ngModel)]="quote.author" name="author" /></label
      ><br />
      <button type="submit">Spara</button>
    </form>
  `,
})
export class EditQuoteComponent implements OnInit {
  quote: Quote | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quoteService: QuoteService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.quoteService.getQuotes().subscribe((quotes) => {
      this.quote = quotes.find((q) => q.id == id);
    });
  }

  save() {
    if (!this.quote || !this.quote.id) return;
    this.quoteService
      .updateQuote(this.quote.id, this.quote)
      .subscribe(() => this.router.navigate(['/quotes']));
  }
}
