import { Component, OnInit } from '@angular/core';
import { Observable, filter } from 'rxjs';
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



@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule, MatListModule, RouterLink,
    MatToolbarModule, MatInputModule, MatFormFieldModule, MatButtonModule,
    MatIconModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  title = 'Characters'
  selectedCharacter?: Character
  filters?: CharacterFilter
  page = 1;
  pageSize = 10;

  ngOnInit(): void {
    const filtersStr=localStorage.getItem("characterFilters")
    if(filtersStr){
      this.filters=JSON.parse(filtersStr);
    }
    this.getCharacters()
  }

  getCharacters() {
    this.characters = this.service.getCharacters(this.page, this.pageSize, this.filters);
    this.characters.subscribe((characters) => console.log(characters))
  }

  constructor(private service: CharacterService, public dialog: MatDialog) {
  }

  openFilters() {
    let dialogRef = this.dialog.open(CharacterFiltersComponent, {
      data: {...this.filters},
    });

    dialogRef.afterClosed().subscribe(newFilters => {
      if (JSON.stringify(newFilters) !== JSON.stringify(this.filters)) {
        this.filters = newFilters;
        this.getCharacters();
        localStorage.setItem('characterFilters', JSON.stringify(this.filters));
      }
    });
  }

  characters?: Observable<Character[]>
}
