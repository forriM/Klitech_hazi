import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CharacterFilter } from '../../models/CharacterFilters';

@Component({
  selector: 'app-character-filters',
  standalone: true,
  imports:
    [
      FormsModule,
      MatFormFieldModule,
      MatSelectModule,
      MatCheckboxModule,
      MatInputModule,
      MatDialogModule,
      MatButtonModule
    ],
  templateUrl: './character-filters.component.html',
  styleUrl: './character-filters.component.scss'
})
/**
 * Component responsible for displaying and editing the filters used for the characters list
 */
export class CharacterFiltersComponent implements OnInit {
  //Filters that are being edited
  newFilters: CharacterFilter

  constructor(
    public dialogRef: MatDialogRef<CharacterFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public filters?: CharacterFilter
  ) {
    /**initialize edited filters to empty object */
    this.newFilters = {
      name: '',
      born: '',
      died: '',
      isAlive: undefined,
      gender: '',
      culture: ''
    }
  }
  /**
   * copy filters into newFilters to be edited
   */
  ngOnInit(): void {
    if (this.filters) {
      this.newFilters = this.filters;
    }

  }

  /**
   * clears filters
   */
  clear() {
    this.newFilters = {
      name: '',
      born: '',
      died: '',
      isAlive: undefined,
      gender: '',
      culture: ''
    }
  }
  /**
   * closes the dialog and returns the edited filters
   */
  saveAndExit() {
    this.dialogRef.close(this.newFilters);
  }
  /**
   * closes the dialog and returns the original filters
   */
  close() {
    this.dialogRef.close(this.filters);
  }
}
