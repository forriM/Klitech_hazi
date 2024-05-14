import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { BookFilter } from '../models/BookFilters';

@Injectable({
  providedIn: 'root'
})
/**
 * Service containing logic for Characters
 */
export class BookService {
  
  url = "https://www.anapioficeandfire.com/api/books"
  constructor(private http: HttpClient) { }
  /**
   * Fetches the houses from the api
   * @param page 
   * @param pageSize 
   * @param filters 
   * @returns 
   */
  getBooks(page = 1, pageSize = 10, filters?: BookFilter) {
    if (pageSize > 50) pageSize = 50;
    let params = this.createHttpParams(page, pageSize, filters)
    console.log(params);
    const options = {
      params: params
    }
    return this.http.get<Book[]>(this.url, options)
  }
  /**
   * fetches a specific Book
   * @param url the url pointing to the resource
   * @returns the House object
   */
  getBook(url: string) {
    return this.http.get<Book>(url);
  }
  /**
   * Gets the saved filter object from localstorage
   * @returns the filters
   */
  getFilters(): BookFilter | undefined{
    const filterStr = localStorage.getItem('bookFilters');
    if(filterStr && filterStr !== 'undefined'){
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
  private createHttpParams(page: number, pageSize: number, filters: BookFilter | undefined) {
    //create httpParams object
    let params = new HttpParams()
    //set page and pagesize parameters
    params = params.set("page", page).set("pageSize",pageSize)

    if(!filters) return params
    //if the filters object exist we add every properties value to the httpparams that is set
    params = filters.name ? params.set("name", filters.name) : params
    params = filters.fromReleaseDate ? params.set("fromReleaseDate", JSON.parse(JSON.stringify(filters.fromReleaseDate))) : params
    params = filters.toReleaseDate? params.set("toReleaseDate", JSON.parse(JSON.stringify(filters.toReleaseDate))) : params

    return params
  }
}
