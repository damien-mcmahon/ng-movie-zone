import { Action } from '@ngrx/store';
import { Genre } from '../models/genre';
import { Movie } from '../models/movie';

export const DATA_RECIEVED = '[App] DATA_RECIEVED';
export const DATA_RECIEVED_ERROR = '[App] DATA_RECIEVED_ERROR';
export const REMOVE_GENRE = '[App] REMOVE_GENRE';
export const ADD_GENRE = '[App] ADD_GENRE';
export const SET_RATING = '[App] SET_RATING';
export const CLEAR_RATING = '[App] CLEAR_RATING]';


export class SetRatingFilter implements Action {
  readonly type = SET_RATING;
  constructor(public payload: number) {}
}

export class ClearRating implements Action {
  readonly type = CLEAR_RATING;

  constructor(public payload?: any) {}
}

export class AddSelectedGenre implements Action {
  readonly type = ADD_GENRE;

  constructor(public payload: { genre: Genre}) {}
}

export class RemoveSelectedGenre implements Action {
  readonly type = REMOVE_GENRE;

  constructor(public payload: { genre: Genre}) {}
}

export class DataReceivedSuccess implements Action {
  readonly type = DATA_RECIEVED;

  constructor(public payload: {movies: Movie[], genres: Genre[]}) { }
}

export class DataReceivedError implements Action {
  readonly type = DATA_RECIEVED_ERROR;

  constructor(public payload: {error: any}) {}
}

export type ActionsUnion
  = SetRatingFilter
  | ClearRating
  | AddSelectedGenre
  | RemoveSelectedGenre
  | DataReceivedSuccess
  | DataReceivedError;
