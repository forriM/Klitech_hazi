import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../models/Character';
import { CharacterFilter } from '../models/CharacterFilters';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  baseUrl = 'https://www.anapioficeandfire.com/api/characters'
  constructor(private http: HttpClient) { }

  getCharacters(page: number, pageSize: number, filters?: CharacterFilter) {
    pageSize = pageSize > 50 ? 50 : pageSize;
    let params = this.createHttpParams(page, pageSize, filters)
    const options = {
      params: params
    }
    return this.http.get<Character[]>(this.baseUrl, options)
  }

  getCharacter(url: string) {
    return this.http.get<Character>(url)
  }

  private createHttpParams(page:number, pageSize:number, filters?: CharacterFilter, ): HttpParams {

    let params = new HttpParams()
    params.set("page", page).set("pageSize",pageSize)

    if(!filters) return params

    params = filters.name ? params.set("name", filters.name) : params
    params = filters.gender ? params.set("gender", filters.gender) : params
    params = filters.isAlive? params.set("isAlive", filters.isAlive) : params
    params = filters.culture? params.set("culture", filters.culture) : params
    params = filters.born? params.set("born", filters.born) : params
    params = filters.died? params.set("gender", filters.died) : params

    return params
  }
}
