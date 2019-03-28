import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from '../config/api';
import { Movie } from '../models/movie';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseURL = 'https://api.themoviedb.org/3/';
  private CONFIG = 'configuration';
  private NOW_PLAYING = 'movie/now_playing';
  private GENRES = 'genre/movie/list';

  private makeAPIPath = path => {
    return `${this.baseURL}${path}?api_key=${API.key}`;
  }

  private movieAdaptor = (config: any) => (movie: any): Movie => {
    const { title, vote_average: rating, poster_path } = movie;
    const { images } = config;
    const POSTER_SIZE_INT = 4;
    const posterURL = `${images.base_url}${images.poster_sizes[POSTER_SIZE_INT]}${poster_path}`;

    return {
      title,
      rating,
      posterURL
    };
  }

  adaptData = ([config, {results: movies}, { genres}]) => {
    const newMovies = movies.map(this.movieAdaptor(config));
    const foundGenres = new Set();
    movies.forEach(this.findGenres(genres, foundGenres));
    const newGenres = Array.from(foundGenres);

    return {
      movies: newMovies,
      genres: newGenres
    };
  }

  private findGenres = (genres: Genre[], foundGenres)  => (movie: any): void => {
    movie.genre_ids.forEach(gId => foundGenres.add(genres.find(g => g.id === gId)));
  }

  constructor(private http: HttpClient) { }

  getConfigInfo(): Observable<any> {
    return this.http.get(this.makeAPIPath(this.CONFIG));
  }

  getMovieInfo(): Observable<any> {
    return this.http.get(this.makeAPIPath(this.NOW_PLAYING));
  }

  getGenreList(): Observable<any> {
    return this.http.get(this.makeAPIPath(this.GENRES));
  }

  getMovies() {
    return forkJoin(
      this.getConfigInfo(),
      this.getMovieInfo(),
      this.getGenreList()
    ).pipe(
      map(this.adaptData)
    );
  }
}
