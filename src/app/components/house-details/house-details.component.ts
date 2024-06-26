import { Component, OnInit } from '@angular/core';
import { House } from '../../models/House';
import { HouseService } from '../../services/house.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { Character } from '../../models/Character';
import { CharacterService } from '../../services/character.service';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTreeModule } from '@angular/material/tree'
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-house-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatExpansionModule,
    MatTreeModule,
    MatListModule
  ],
  templateUrl: './house-details.component.html',
  styleUrl: './house-details.component.scss'
})
/**
 * Component responsible for diplaying detailed information about a house
 */
export class HouseDetailsComponent implements OnInit {
  house?: House
  currentLord?: Observable<Character>
  overlord?: Observable<Character>
  founder?: Observable<Character>
  heir?: Observable<Character>

  cadetBranches: House[] = []
  swornMembers: Character[] = []

  constructor(private houseService: HouseService, private activatedRoute: ActivatedRoute
    , private characterService: CharacterService
  ) { }
  /**
   * Initializes the house and every connected object
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.houseService.getHouse(params["url"]).subscribe((house) => {
        if (house.currentLord) {
          this.currentLord = this.characterService.getCharacter(house.currentLord);
        }
        if (house.overlord) {
          this.overlord = this.characterService.getCharacter(house.overlord);
        }
        if (house.cadetBranches) {
          house.cadetBranches.map((branchUrl) => {
            this.houseService.getHouse(branchUrl).subscribe((data) => {
              this.cadetBranches.push(data)
            })
          })
        }
        if (house.swornMembers) {
          house.swornMembers.map((memberUrl) => {
            this.characterService.getCharacter(memberUrl).subscribe((data) => {
              this.swornMembers.push(data)
            })
          })
        }
        if (house.founder) {
          this.founder = this.characterService.getCharacter(house.founder);
        }
        if (house.heir) {
          this.heir = this.characterService.getCharacter(house.heir)
        }
        this.house = house
      })

    })
  }



}
