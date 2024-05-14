import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Character } from '../../models/Character';
import { CharacterService } from '../../services/character.service';
import { Book } from '../../models/Book';
import { BookService } from '../../services/book.service';
import { House } from '../../models/House';
import { HouseService } from '../../services/house.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule, RouterLink, MatListModule],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss'
})
/**
 * Component responsible for displaying details about a character
 */
export class CharacterDetailsComponent implements OnInit {
  character?: Character
  spouse?: Character
  father?: Character
  mother?: Character

  books: Book[] = []
  povBooks: Book[] = []
  allegiances: House[] = []

  constructor(private activatedroute: ActivatedRoute, private characterService: CharacterService,
    private bookService: BookService, private houseService: HouseService
  ) { }
  /**
   * Initializes the character and all connected characters houses and books
   */
  ngOnInit(): void {
    this.activatedroute.params.subscribe(param => {

      this.characterService.getCharacter(this.activatedroute.snapshot.params["url"]).subscribe((character) => {
        if (character.books.length) {
          character.books.map((url) => {
            this.bookService.getBook(url).subscribe((book) => this.books.push(book));
          })
        }

        if (character.povBooks.length) {
          character.povBooks.map((url) => {
            this.bookService.getBook(url).subscribe((book) => this.povBooks.push(book));
          })
        }

        if (character.allegiances.length) {
          character.allegiances.map((url => {
            this.houseService.getHouse(url).subscribe((house) => this.allegiances.push(house));
          }))
        }

        if (character.spouse) {
          this.characterService.getCharacter(character.spouse).subscribe((spouse) => this.spouse = spouse);
        }

        if (character.father) {
          this.characterService.getCharacter(character.father).subscribe((spouse) => this.father = spouse);
        }

        if (character.mother) {
          this.characterService.getCharacter(character.mother).subscribe((spouse) => this.mother = spouse);
        }

        this.character = character;
      })
    })

  }


}
