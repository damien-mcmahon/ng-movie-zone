import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GET } from '../api';
import { MovieService } from '../app/movie.service';
import { AppState } from './app.reducer';
import * as fromAppActions from './app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NG Movie Zone';

  constructor(
    private movieService: MovieService,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    // fetch the data...
    this.getMovieInfo();
  }

  getMovieInfo() {
    // TODO - ERROR HANDLING...
    this.movieService.getMovies().subscribe(data => {
      this.store.dispatch(new fromAppActions.DataReceivedSuccess(data));
    });
  }
}
