import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ThemeToggleComponent } from '../theme/theme-toggle.component';
@Component({
  selector: 'app-edit-quote',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ThemeToggleComponent],
  templateUrl: `./edit-quote.component.html`,
})
export class EditQuoteComponent implements OnInit {
  quote: Quote | undefined;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public auth: AuthService,
    private quoteService: QuoteService
  ) {}

  ngOnInit() {
    if (!this.auth.isTokenValid()) {
      this.auth.logout();
      this.router.navigate(['/']);
    }
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
