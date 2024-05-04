import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../models/Character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  baseUrl = 'https://www.anapioficeandfire.com/api/characters'
  constructor(private http: HttpClient) { }

  getCharacters(){
    return this.http.get<Character[]>(this.baseUrl)
  }

  getCharacter(url:string){
    return this.http.get<Character>(url)
  }
}
