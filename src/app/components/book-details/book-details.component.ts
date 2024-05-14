import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/Book';
import { BookService } from '../../services/book.service';
import { CharacterService } from '../../services/character.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Character } from '../../models/Character';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    MatExpansionModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatListModule
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
/**
 * Component responsible for displaying detailed data about one book
 */
export class BookDetailsComponent implements OnInit {

  book?: Book
  characters: Character[] = []
  povCharacters: Character[] = []

  constructor(private bookService: BookService, private characterService: CharacterService,
    private activatedRoute: ActivatedRoute) { }

  /**
   * Fetch the book and its connections
   */
  ngOnInit(): void {
    this.bookService.getBook(this.activatedRoute.snapshot.params["url"]).subscribe((book) => {
      //fetch the characters from the url-s provided
      if (book.characters) {
        book.characters.map((url) => {
          this.characterService.getCharacter(url).subscribe((character) => this.characters?.push(character));
        })
      }
      //fetch the characters who had a pov chapter
      if (book.povCharacters) {
        book.povCharacters.map((url) => {
          this.characterService.getCharacter(url).subscribe((character) => this.povCharacters?.push(character));
        })
      }
      this.book = book;
    });
  }

}
