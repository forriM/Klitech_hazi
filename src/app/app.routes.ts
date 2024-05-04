import { Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { HousesComponent } from './components/houses/houses.component';
import { CharactersComponent } from './components/characters/characters.component';
import { HouseDetailsComponent } from './components/house-details/house-details.component';

export const routes: Routes = [
    {path: 'books', component: BooksComponent},
    {path: 'houses', component: HousesComponent},
    {path: 'houses/:url', component: HouseDetailsComponent},
    {path: 'characters', component: CharactersComponent},
    {path: '', redirectTo:'/characters', pathMatch: 'full'}
];
