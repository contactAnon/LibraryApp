import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-quote',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: `./add-quote.component.html`,
})
export class AddQuoteComponent {
  quote: Quote = { text: '', author: '' };
  errorMessage: string = '';

  constructor(
    private quoteService: QuoteService,
    public router: Router,
    public auth: AuthService
  ) {}
  ngOnInit() {
    if (!this.auth.isTokenValid()) {
      this.auth.logout();
      this.router.navigate(['/']);
    }
  }
  save() {
    if (!this.quote.text || this.quote.text.trim() === '') {
      this.errorMessage = 'Citat och författare fälten kan inte vara tomma';
      return;
    }

    // Clear any previous error
    this.errorMessage = '';

    // Call the service
    this.quoteService.addQuote(this.quote).subscribe({
      next: () => this.router.navigate(['/quotes']),
      error: () =>
        (this.errorMessage = 'Ett fel uppstod vid sparande av citatet.'),
    });
  }
}
