import { Genre } from './genre';
import { Movie } from './movie';

export interface AppData {
  movies: Movie[];
  genres: Genre[];
}
