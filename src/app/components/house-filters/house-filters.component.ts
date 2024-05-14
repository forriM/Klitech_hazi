import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HouseFilter } from '../../models/HouseFilters';



@Component({
  selector: 'app-house-filters',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './house-filters.component.html',
  styleUrl: './house-filters.component.scss'
})
/**
 * Component responsible for displaying and editing filters that are being applied to Houses
 */
export class HouseFiltersComponent {
  //filters that are being edited
  newFilters: HouseFilter

  constructor(
    public dialogRef: MatDialogRef<HouseFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public filters?: HouseFilter
  ) {
    this.newFilters = {
      name:'',
      region:'',
      words:'',
      hasWords:undefined,
      hasTitles:undefined,
      hasDiedOut:undefined,
      hasSeats:undefined,
      hasAncestralWeapons:undefined
    }
  }
  /**
   * copies current filters into newFilters to be edited
   */
  ngOnInit(): void {
    if (this.filters) {
      this.newFilters = this.filters;
    }

  }

  /**
   * clears the filters being edited
   */
  clear() {
    this.newFilters = {
      name:'',
      region:'',
      words:'',
      hasWords:undefined,
      hasTitles:undefined,
      hasDiedOut:undefined,
      hasSeats:undefined,
      hasAncestralWeapons:undefined
    }
  }
  /**
   * closes the dialog and returns the edited filters
   */
  saveAndExit() {
    this.dialogRef.close(this.newFilters);
  }

  /**
   * Closes the dialog and returns the original filters
   */
  close() {
    this.dialogRef.close(this.filters);
  }

}
