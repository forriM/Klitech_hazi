import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { House } from '../models/House';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  url = 'https://www.anapioficeandfire.com/api/houses'
  constructor(private http: HttpClient) { }

  getHouses(page = 1, pageSize = 20) {
    pageSize = pageSize>50 ? 50 : pageSize;
    const options = {
      params: new HttpParams().set('page', page).set('pageSize', pageSize)
    }
    return this.http.get<House[]>(this.url,options);
  }

  getHouse(url:string){
    return this.http.get<House>(url);
  }
}
