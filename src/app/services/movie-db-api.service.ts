import { Injectable } from '@angular/core';
import { environment } from '../enviroment/environment';
import MovieModel from '../models/movie.model';

interface MovieListResponseType {
  page: number;
  total_pages: number;
  total_results: number;
  results: MovieModel[];
}

@Injectable({
  providedIn: 'root',
})
export class MovieDbApiService {
  baseUrl = 'https://api.themoviedb.org/3/';
  headers = {
    accept: 'application/json',
    Authorization: `Bearer ${environment.movieDbApiToken}`,
  };
  currentDate = new Date().toISOString().split('T')[0];
  constructor() {}

  async fetchLatestMovies(page: number) {
    try {
      const response = (await fetch(
        `${this.baseUrl}discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=primary_release_date.desc&primary_release_date.lte=${this.currentDate}`,
        { method: 'GET', headers: this.headers }
      ).then((response) => response.json())) as MovieListResponseType;
      return response?.results || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async fetchLMovieDetailsById(id: number) {
    try {
      const response = (await fetch(`${this.baseUrl}movie/${id}?language=en-US`, {
        method: 'GET',
        headers: this.headers,
      }).then((response) => response.json())) as MovieModel;
      return response;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async fetchPopularMovies(page: number) {
    try {
      const response = (await fetch(`${this.baseUrl}movie/popular?language=en-US&page=${page}`, {
        method: 'GET',
        headers: this.headers,
      }).then((response) => response.json())) as MovieListResponseType;
      return response?.results || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
