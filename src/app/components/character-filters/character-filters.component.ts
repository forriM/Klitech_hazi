import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
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
export class CharacterFiltersComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CharacterFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public filters?: CharacterFilter
  ) {
    this.newFilters = {
      name: '',
      born: '',
      died: '',
      isAlive: undefined,
      gender: '',
      culture: ''
    }
  }

  ngOnInit(): void {
    if (this.filters) {
      this.newFilters = this.filters;
    }

  }
  newFilters: CharacterFilter
  
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

  saveAndExit() {
    this.dialogRef.close(this.newFilters);
  }

  close() {
    this.dialogRef.close(this.filters);
  }
}
