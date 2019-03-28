import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppReducer } from './app.reducer';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieComponent } from './movie/movie.component';
import { FilterControlsComponent } from './filter-controls/filter-controls.component';
import { RatingBgPipe } from './rating-bg.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieComponent,
    FilterControlsComponent,
    RatingBgPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      app: AppReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
