import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { Observable } from 'rxjs';
import { House } from '../../models/House';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-houses',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.scss'
})
export class HousesComponent implements OnInit{
  constructor(private service:HouseService){}
  ngOnInit(): void {
    this.houses = this.service.getHouses();
  }
  
  houses?:Observable<House[]>

}
