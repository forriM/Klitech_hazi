import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/Book';
import { BookService } from '../../services/book.service';
import { CharacterService } from '../../services/character.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Character } from '../../models/Character';


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [MatCardModule, RouterLink, MatExpansionModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {
  loading:boolean = true
  constructor(private bookService: BookService, private characterService:CharacterService,
     private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.bookService.getBook(this.activatedRoute.snapshot.params["url"]).subscribe((book) => {
      if(book.characters){
        book.characters.map((url)=>{
          this.characterService.getCharacter(url).subscribe((character)=>this.characters?.push(character));
        })
      }
      if(book.characters){
        book.povCharacters.map((url)=>{
          this.characterService.getCharacter(url).subscribe((character)=>this.povCharacters?.push(character));
        })
      }
      this.book = book;
      this.loading = false;
    });
  }
  book?: Book
  characters: Character[] = []
  povCharacters: Character[] = []
}
