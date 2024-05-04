import { Component, Input, OnInit } from '@angular/core';
import { House } from '../../models/House';
import { HouseService } from '../../services/house.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card'
import { Character } from '../../models/Character';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-house-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule],
  templateUrl: './house-details.component.html',
  styleUrl: './house-details.component.scss'
})
export class HouseDetailsComponent implements OnInit {
  @Input() house?: Observable<House> // nem fix h kell
  currentLord?: Observable<Character>
  overlord?: Observable<Character>
  founder?:Observable<Character> //TODO get data put it to frontend
  heir?:Observable<Character> // TODO same thing

  cadetBranches?: House[] //PUT OUT TO frontend
  swornMembers?: Character[] //PUT OUT TO frontend
  //TODO put every array out to html

  constructor(private houseService: HouseService, private activatedRoute: ActivatedRoute
    , private characterService: CharacterService
  ) {}
  ngOnInit(): void {
    
    if(!this.house){
      this.house = this.houseService.getHouse(this.activatedRoute.snapshot.params["url"])
    }
    this.house.subscribe((house)=>{
      if(house.currentLord){
        this.currentLord = this.characterService.getCharacter(house.currentLord);
      }
      if(house.overlord){
        this.overlord = this.characterService.getCharacter(house.overlord);
      }
      if(house.cadetBranches){
        for (let branchUrl in house.cadetBranches){
          this.houseService.getHouse(branchUrl).subscribe((data)=>{this.cadetBranches?.push(data)})
        }
      }
      if(house.swornMembers){
        for (let memberUrl in house.swornMembers){
          this.characterService.getCharacter(memberUrl).subscribe((data) => {this.swornMembers?.push(data)})
        }
      }
    })

  }


}
