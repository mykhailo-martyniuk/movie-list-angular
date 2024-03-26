import { Component, EventEmitter, Input, Output } from '@angular/core';
import MovieModel from '../../../../models/movie.model';
import { IconLikeComponent } from '../../../icons/icon-like/icon-like.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [IconLikeComponent, RouterLink],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css',
})
export class MovieItemComponent {
  @Input()
  movie: MovieModel | undefined = undefined;
  @Input()
  isFavorite: boolean = false;
  @Output()
  addFavorite: EventEmitter<number> = new EventEmitter<number>();

  handleAddFavorite(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.addFavorite.emit(this.movie?.id);
  }
}
