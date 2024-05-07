import { Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { HousesComponent } from './components/houses/houses.component';
import { CharactersComponent } from './components/characters/characters.component';
import { HouseDetailsComponent } from './components/house-details/house-details.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';

export const routes: Routes = [
    {path: 'books', component: BooksComponent, title:'Books'},
    {path: 'books/:url', component: BookDetailsComponent},
    {path: 'houses', component: HousesComponent, title:'Houses'},
    {path: 'houses/:url', component: HouseDetailsComponent},
    {path: 'characters', component: CharactersComponent, title:'Characters'},
    {path: 'characters/:url', component: CharacterDetailsComponent},
    {path: '', redirectTo:'/characters', pathMatch: 'full'}
];
