import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { Observable } from 'rxjs';
import { House } from '../../models/House';
import { CommonModule, NgFor } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-houses',
  standalone: true,
  imports: [NgFor, CommonModule, MatListModule, MatGridListModule, RouterLink],
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.scss'
})
export class HousesComponent implements OnInit{
  constructor(private service:HouseService){}
  selectedHouse?: House
  ngOnInit(): void {
    this.houses = this.service.getHouses();
  }
  
  houses?:Observable<House[]>

}
