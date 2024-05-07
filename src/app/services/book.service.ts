import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = "https://www.anapioficeandfire.com/api/books"
  constructor(private http:HttpClient) { }

  getBooks(page = 1, pageSize = 10){
    if(pageSize>50) pageSize = 50;
    const options = {
      params: new HttpParams().set("page", page).set("pagesize",pageSize)
    }
    return this.http.get<Book[]>(this.url, options)
  }

  getBook(url:string){
    return this.http.get<Book>(url);
  }
}
