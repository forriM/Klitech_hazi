import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../models/Character';
import { CharacterFilter } from '../models/CharacterFilters';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Service containing logic for Characters
 */
export class CharacterService {

  baseUrl = 'https://www.anapioficeandfire.com/api/characters'
  constructor(private http: HttpClient) { }
  /**
   * Fetches the characters from the api
   * @param page 
   * @param pageSize 
   * @param filters 
   * @returns 
   */
  getCharacters(page: number, pageSize: number, filters?: CharacterFilter) {
    pageSize = pageSize > 50 ? 50 : pageSize;
    let params = this.createHttpParams(page, pageSize, filters)
    const options = {
      observe: 'response' as const,
      params: params,
    }
    return this.http.get<Character[]>(this.baseUrl, options)
  }


  /**
   * Fetches a unique Character
   * @param url the url pointing to the resource
   * @returns the House object
   */
  getCharacter(url: string) {
    return this.http.get<Character>(url)
  }
  /**
   * Gets the saved filter object from localstorage
   * @returns the filters
   */
  getFilters(): CharacterFilter | undefined {
    const filtersStr = localStorage.getItem("characterFilters")

    if (filtersStr && filtersStr !== 'undefined') {
      return JSON.parse(filtersStr);
    }
    return undefined
  }
  /**
   * Creates a HttpParams object based on the filters and pagination data
   * @param page the number of the page
   * @param pageSize the number of data we want on one page
   * @param filters 
   * @returns 
   */
  private createHttpParams(page: number, pageSize: number, filters?: CharacterFilter,): HttpParams {
    //create httpParams object
    let params = new HttpParams()
    //set page and pagesize parameters
    params = params.set("page", page).set("pageSize", pageSize)

    if (!filters) return params
    //if the filters object exist we add every properties value to the httpparams that is set
    params = filters.name ? params.set("name", filters.name) : params
    params = filters.gender ? params.set("gender", filters.gender) : params
    params = filters.isAlive ? params.set("isAlive", filters.isAlive) : params
    params = filters.culture ? params.set("culture", filters.culture) : params
    params = filters.born ? params.set("born", filters.born) : params
    params = filters.died ? params.set("gender", filters.died) : params

    return params
  }
}
