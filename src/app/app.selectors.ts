import { createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';
import { Movie } from '../models/movie';

// TODO - This isn't great...
interface LiveAppState {
  app: AppState;
}

const ranked = (mA, mB) => {
  const {rating: ratingA} = mA;
  const {rating: ratingB} = mB;

  if (ratingA === ratingB) {
    return 0;
  }

  return ratingA < ratingB ? 1 : -1;
};

const filterRating = (rating: number) => (movie: Movie): boolean => movie.rating >= rating;

export const getApp = (state: LiveAppState) => state.app;
export const getSelectedGenres = createSelector(getApp, ({selectedGenres}) => selectedGenres);

export const getRatingFilter = createSelector(getApp, ({ratingFilter}) => ratingFilter);

export const getMovies = createSelector(getApp, state => state.movies);

export const getVisibleMovies = createSelector(
  getMovies,
  getRatingFilter,
  getSelectedGenres,
  (movies, ratingFilter, selectedGenres) => {
    movies.sort(ranked);

    if (!ratingFilter && !selectedGenres.length) {
      return movies;
    }

    let filtered = movies;

    if (selectedGenres.length) {
      // @ts-ignore
      filtered = movies.filter(({genres}) => genres.some(gId => selectedGenres.find(g => g.id === gId)));
    }

    return ratingFilter ?
      filtered.filter(filterRating(ratingFilter)) : filtered;
  })

