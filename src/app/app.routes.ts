import { Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { HousesComponent } from './components/houses/houses.component';
import { CharactersComponent } from './components/characters/characters.component';

export const routes: Routes = [
    {path: 'books', component: BooksComponent},
    {path: 'houses', component: HousesComponent},
    {path: 'characters', component: CharactersComponent},
    {path: '', redirectTo:'/characters', pathMatch: 'full'}
];
