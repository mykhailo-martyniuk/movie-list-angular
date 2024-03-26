interface MovieModel {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  genre_ids: number[];
  overview: string;
  vote_average: number;
}

export default MovieModel;
