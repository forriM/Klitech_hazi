import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  getBooks(page = 1, pageSize = 10){

  }

  getBook(url:string){
    this.http.get<Book>(url);
  }
}
