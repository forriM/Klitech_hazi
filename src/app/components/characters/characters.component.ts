import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../models/Character';
import { CharacterService } from '../../services/character.service';
import { CommonModule, NgFor } from '@angular/common';
import{MatListModule} from '@angular/material/list'

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [NgFor, CommonModule, MatListModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit{
  selectedCharacter?: Character
  ngOnInit(): void {
    this.characters=this.service.getCharacters();
    
  }

  constructor(private service:CharacterService){

  }
  characters?:Observable<Character[]>
}
