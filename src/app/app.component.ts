import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListPageComponent } from './components/movie-list-page/movie-list-page.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieListPageComponent, NgIf],
  templateUrl: './app.component.html',
})
export class AppComponent {}
