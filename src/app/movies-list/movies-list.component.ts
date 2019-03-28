import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.reducer';
import { getVisibleMovies } from '../app.selectors';

import { Movie } from '../../models/movie';


@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {

  movies: Observable<Movie[]>;

  constructor(private store: Store<{app: { movies: Movie[]}}>) {
    this.movies = store.pipe(select(getVisibleMovies));
  }

}
