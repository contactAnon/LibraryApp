import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./editbook.component.html`,
})
export class EditBookComponent implements OnInit {
  book: any = {};

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    public router: Router,
    public auth: AuthService
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
