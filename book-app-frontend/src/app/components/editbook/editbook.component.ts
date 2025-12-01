import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Redigera bok</h2>

    <form (ngSubmit)="save()">
      <input
        type="text"
        [(ngModel)]="book.title"
        name="title"
        placeholder="Titel"
      />

      <input
        type="text"
        [(ngModel)]="book.author"
        name="author"
        placeholder="Author"
      />

      <input type="date" [(ngModel)]="book.publicationDate" name="date" />

      <button type="submit">Spara</button>
    </form>
  `,
})
export class EditBookComponent implements OnInit {
  book: any = {};

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.bookService.getBookById(id).subscribe((res) => {
      this.book = res;
      if (this.book.publicationDate) {
        this.book.publicationDate = this.book.publicationDate.split('T')[0];
      }
    });
  }

  save() {
    const id = this.route.snapshot.params['id'];

    this.bookService.updateBook(id, this.book).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
