import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { House } from '../models/House';
import { HouseFilter } from '../models/HouseFilters';

@Injectable({
  providedIn: 'root'
})
/**
 * Service containing logic for Houses
 */
export class HouseService {
  
  url = 'https://www.anapioficeandfire.com/api/houses'
  constructor(private http: HttpClient) { }
  /**
   * Fetches the houses from the api
   * @param page 
   * @param pageSize 
   * @param filters 
   * @returns 
   */
  getHouses(page: number, pageSize: number, filters?: HouseFilter) {
    pageSize = pageSize > 50 ? 50 : pageSize;
    let params = this.createHttpParams(page, pageSize, filters)
    const options = {
      params: params,
      observe: 'response' as const
    }
    return this.http.get<House[]>(this.url, options);
  }
  
  /**
   * gets a specific House
   * @param url the url pointing to the resource
   * @returns the House object
   */
  getHouse(url: string) {
    return this.http.get<House>(url);
  }
  /**
   * Gets the saved filter object from localstorage
   * @returns the filters
   */
  getFilters():HouseFilter |undefined {
    const filterStr = localStorage.getItem('houseFilters');
    if (filterStr && filterStr !== 'undefined') {
      return JSON.parse(filterStr);
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
  private createHttpParams(page: number, pageSize: number, filters: HouseFilter | undefined) {
    //create httpParams object
    let params = new HttpParams()
    //set page and pagesize parameters
    params = params.set("page", page).set("pageSize", pageSize)

    if (!filters) return params
    //if the filters object exist we add every properties value to the httpparams that is set
    params = filters.name ? params.set("name", filters.name) : params
    params = filters.region ? params.set("region", filters.region) : params
    params = filters.words ? params.set("words", filters.words) : params
    params = filters.hasWords ? params.set("hasWords", filters.hasWords) : params
    params = filters.hasTitles ? params.set("hasTitles", filters.hasTitles) : params
    params = filters.hasSeats ? params.set("hasSeats", filters.hasSeats) : params
    params = filters.hasDiedOut ? params.set("hasDiedOut", filters.hasDiedOut) : params
    params = filters.hasAncestralWeapons ? params.set("hasAncestralWeapons", filters.hasAncestralWeapons) : params

    return params
  }
}
