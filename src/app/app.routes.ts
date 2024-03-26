import { Routes } from '@angular/router';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { MovieListPageComponent } from './components/movie-list-page/movie-list-page.component';
export const routes: Routes = [
  {
    path: '',
    component: MovieListPageComponent,
  },
  {
    path: 'movie/:id',
    component: MoviePageComponent,
  },
];
