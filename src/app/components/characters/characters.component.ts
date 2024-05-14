import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../models/Character';
import { CharacterService } from '../../services/character.service';
import { CommonModule, NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list'
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CharacterFilter } from '../../models/CharacterFilters';
import { MatDialog } from '@angular/material/dialog'
import { CharacterFiltersComponent } from '../character-filters/character-filters.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { PaginatorService } from '../../services/paginator.service';


@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    NgFor, 
    FormsModule, 
    CommonModule, 
    MatListModule, 
    RouterLink,
    MatToolbarModule, 
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
/**
 * Component responsible for displaying and handling the list fo characters
 */
export class CharactersComponent implements OnInit {
  //reference to paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  length?: number = 0;
  //filters currently applied
  filters?: CharacterFilter
  page = 1;
  pageSize = 10;
  characters?: Character[] | null

  constructor(private service: CharacterService, public dialog: MatDialog, private paginatorService: PaginatorService) { }

  /**
   * initialize filters and the list of characters
   */
  ngOnInit(): void {
    this.filters = this.service.getFilters()
    this.getCharacters()
  }
  /**
   * gets list of characters based on filters and pagination data
   */
  getCharacters() {
    this.service.getCharacters(this.page, this.pageSize, this.filters).subscribe(response => {
      this.length = this.paginatorService.getTotalDataFromHeader(response.headers.get('link'))
      console.log(this.length)
      this.characters = response.body
    });
    console.log(this.page, this.pageSize)
  }
  /**
   * opens the dialog for editing filters
   */
  openFilters() {
    let dialogRef = this.dialog.open(CharacterFiltersComponent, {
      data: { ...this.filters },
    });

    dialogRef.afterClosed().subscribe(newFilters => {
      this.setFilters(newFilters);
    });
  }

  /**
   * Reacts to an event on the paginator and refetches data if needed
   * @param event 
   */
  pageEvent(event: PageEvent) {
    let wasChanged = false;
    if (event.pageIndex + 1 !== this.page) {
      this.page = event.pageIndex + 1;
      wasChanged = true;
    }
    if (event.pageSize !== this.pageSize) {
      this.pageSize = event.pageSize;
      wasChanged = true;
    }
    if (wasChanged) {
      this.getCharacters();
    }
    console.log(event);
  }
  /**
   * sets the filters if they were changed refetches the characters and resets paginator
   * @param newFilters 
   */
  private setFilters(newFilters: any) {
    if (JSON.stringify(newFilters) !== JSON.stringify(this.filters)) {
      this.filters = newFilters;
      this.paginator.pageIndex = 0;
      this.page = 1;
      this.getCharacters();
      localStorage.setItem('characterFilters', JSON.stringify(this.filters));
    }
  }

}
