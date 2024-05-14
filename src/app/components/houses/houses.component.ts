import { Component, OnInit, ViewChild } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { Observable } from 'rxjs';
import { House } from '../../models/House';
import { CommonModule, NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list'
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CharacterFiltersComponent } from '../character-filters/character-filters.component';
import { HouseFilter } from '../../models/HouseFilters';
import { HouseFiltersComponent } from '../house-filters/house-filters.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginatorService } from '../../services/paginator.service';

@Component({
  selector: 'app-houses',
  standalone: true,
  imports: [
    NgFor, 
    CommonModule, 
    MatListModule, 
    MatGridListModule, 
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.scss'
})
/**
 * Component responsible for displaying and handling the list fo characters
 */
export class HousesComponent implements OnInit {
  //reference to the paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filters?: HouseFilter;
  page = 1;
  pageSize = 10;
  length?: number = 0;
  houses?: House[] | null

  constructor(private service: HouseService, private dialog: MatDialog, private paginatorService: PaginatorService) { }
  /**
   * Initializes filters and the list of houses
   */
  ngOnInit(): void {
    this.filters = this.service.getFilters();
    this.getHouses();
  }
  /**
   * Opens the dialog for displaying and editing the filters being used
   */
  openFilters() {
    let dialogRef = this.dialog.open(HouseFiltersComponent, {
      data: { ...this.filters },
    });

    dialogRef.afterClosed().subscribe(newFilters => {
      this.setFilters(newFilters);
    });
  }
  /**
   * gets list of characters based on filters and pagination data
   */
  getHouses() {
    console.log(this.page, this.pageSize);
    this.service.getHouses(this.page, this.pageSize, this.filters).subscribe(
      response => {
        this.length = this.paginatorService.getTotalDataFromHeader(response.headers.get('link'))
        this.houses = response.body
      }
    );
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
      this.getHouses();
    }
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
      localStorage.setItem('houseFilters', JSON.stringify(this.filters));
      this.getHouses();
    }
  }

}
