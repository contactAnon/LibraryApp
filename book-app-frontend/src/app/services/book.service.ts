import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id?: number;
  title: string;
  author: string;
  publicationDate: string;
}

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = 'http://localhost:5267/api/book';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(book: Book) {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(id: number, book: Book) {
    return this.http.put(`${this.apiUrl}/${book.id}`, book);
  }

  getBookById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getBook(id: number) {
    return this.http.get(`${this.apiUrl}/books/${id}`);
  }
}
