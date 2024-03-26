import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDbApiService } from '../../services/movie-db-api.service';
import MovieModel from '../../models/movie.model';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.css',
})
export class MoviePageComponent implements OnInit {
  movie: MovieModel | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private movieDbApiService: MovieDbApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const movieId = params['id'];
      if (movieId) this.getMovie(movieId);
    });
  }

  getMovie(movieId: number) {
    this.movieDbApiService.fetchLMovieDetailsById(movieId).then((result) => (this.movie = result));
  }
}
