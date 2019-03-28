import * as fromAppActions from './app.actions';
import { Movie } from '../models/movie';
import { Genre } from '../models/genre';

export interface AppState {
  movies: Movie[];
  genres: Genre[];
  selectedGenres: Genre[];
  ratingFilter: null | number;
}

export const initialState = {
  movies: [],
  genres: [],
  selectedGenres: [],
  ratingFilter: null
};


export function AppReducer(state = initialState, action: fromAppActions.ActionsUnion) {
  const { type, payload } = action;

  switch (type) {
    case fromAppActions.ADD_GENRE:
      return {
        ...state,
        selectedGenres: [...state.selectedGenres, payload.genre]
      };

    case fromAppActions.REMOVE_GENRE:
      return {
        ...state,
        selectedGenres: state.selectedGenres.filter(s => s.id !== payload.genre.id)
      };

    case fromAppActions.SET_RATING:
      return {
        ...state,
        ratingFilter: payload
      };

    case fromAppActions.CLEAR_RATING:
      return {
        ...state,
        ratingFilter: null
      };

    case fromAppActions.DATA_RECIEVED: {
      const { movies, genres} = payload;

      return {
        ...state,
        movies,
        genres
      };
    }

    default:
      return state;
  }
}
