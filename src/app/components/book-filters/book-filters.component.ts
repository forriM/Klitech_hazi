import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BookFilter } from '../../models/BookFilters';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-book-filters',
  standalone: true,
  imports: [
    MatDatepickerModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './book-filters.component.html',
  styleUrl: './book-filters.component.scss'
})
/**
 * Component responsible for diplaying and editing the filters for books
 */
export class BookFiltersComponent {
  //Filters that are being edited
  newFilters: BookFilter
  constructor(
    public dialogRef: MatDialogRef<BookFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public filters?: BookFilter
  ) {
    //init the newFilters variable to an empty object
    this.newFilters = {
      name: '',
      fromReleaseDate: undefined,
      toReleaseDate: undefined,
    }
  }
  //copy the filters variable into newFilters if it is present
  ngOnInit(): void {
    if (this.filters) {
      this.newFilters = this.filters;
    }

  }
  /**
   * clears all filters
   */
  clear() {
    this.newFilters = {
      name: '',
      fromReleaseDate: undefined,
      toReleaseDate: undefined,
    }
  }
  /**
   * Closes the dialog returning the edited filters
   */
  saveAndExit() {
    console.log(this.newFilters);
    this.dialogRef.close(this.newFilters);
  }
  /**
   * closes the dialog returning the original filters
   */
  close() {
    this.dialogRef.close(this.filters);
  }
}
