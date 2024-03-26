import { Component, OnInit } from '@angular/core';
import { MovieDbApiService } from '../../services/movie-db-api.service';
import MovieModel from '../../models/movie.model';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { NgForOf } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-movie-list-page',
  standalone: true,
  imports: [MovieItemComponent, NgForOf],
  templateUrl: './movie-list-page.component.html',
  styleUrl: './movie-list-page.component.css',
})
export class MovieListPageComponent implements OnInit {
  currentPage: number = 1;
  movies: MovieModel[] = [];
  showPopular: boolean = true;
  favoritesMoviesIds: number[] = [];
  constructor(
    private movieDbApiService: MovieDbApiService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.movieDbApiService.fetchPopularMovies(1).then((result) => (this.movies = result));
    this.favoritesMoviesIds = this.localStorageService.getData('favorite') || [];
  }

  async handleClickPopular() {
    if (!this.showPopular) {
      this.movies = await this.movieDbApiService.fetchPopularMovies(1);
      this.showPopular = true;
    }
  }

  async handleClickLatest() {
    if (this.showPopular) {
      this.movies = await this.movieDbApiService.fetchLatestMovies(1);
      this.showPopular = false;
    }
  }

  async nextPage() {
    this.currentPage += 1;
    if (this.showPopular) {
      this.movies = await this.movieDbApiService.fetchPopularMovies(this.currentPage);
    } else {
      this.movies = await this.movieDbApiService.fetchLatestMovies(this.currentPage);
    }
  }

  async prevPage() {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      if (this.showPopular) {
        this.movies = await this.movieDbApiService.fetchPopularMovies(this.currentPage);
      } else {
        this.movies = await this.movieDbApiService.fetchLatestMovies(this.currentPage);
      }
    }
  }

  async addFavorite(id: number) {
    if (this.favoritesMoviesIds.includes(id)) {
      this.localStorageService.removeItemsFromStoredArray<number>('favorite', (item) => item !== id);
      this.favoritesMoviesIds = this.favoritesMoviesIds.filter((el) => el !== id);
      return;
    }
    this.favoritesMoviesIds.push(id);
    this.localStorageService.saveData('favorite', this.favoritesMoviesIds, true);
  }
}
