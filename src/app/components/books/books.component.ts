import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../../models/Book';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookFilter } from '../../models/BookFilters';
import { BookFiltersComponent } from '../book-filters/book-filters.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule, 
    MatListModule, 
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
/**
 * Component responsible for displaying and managing the list of books
 */
export class BooksComponent implements OnInit {
  books?: Observable<Book[]>
  filters?: BookFilter;
  page=1;
  pageSize=20;

  constructor(private bookService: BookService, private dialog:MatDialog) { }
  /**
   * Reads previously saved filters and fetches the books
   */
  ngOnInit(): void {
    this.filters = this.bookService.getFilters()
    this.getBooks();
  }
  /**
   * Opens the dialog for editing filters
   */
  openFilters() {
    let dialogRef = this.dialog.open(BookFiltersComponent, {
      data: { ...this.filters },
    });

    dialogRef.afterClosed().subscribe(newFilters => {
      this.setFilters(newFilters);
    });
  }
  /**
   * fetches books from the api based on current filters and page parameters
   */
  getBooks() {
    this.books = this.bookService.getBooks(this.page, this.pageSize, this.filters);
  }
  /**
   * changes the filters fetches the new data and resets paginator to first page
   * @param newFilters 
   */
  private setFilters(newFilters: any) {
    if (JSON.stringify(newFilters) !== JSON.stringify(this.filters)) {
      this.filters = newFilters;
      this.getBooks();
      localStorage.setItem('bookFilters', JSON.stringify(this.filters));
    }
  }

}
