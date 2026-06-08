import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieDetailComponent } from './movie-detail.component';
import { FavoriteService } from '../services/favorite.service';

@NgModule({
  declarations: [
    MovieDetailComponent // O teu componente é declarado aqui
  ],
  imports: [
    CommonModule, // É isto que vai resolver os erros do *ngIf e dos pipes no HTML!
    RouterModule.forChild([
      { path: '', component: MovieDetailComponent }
    ])
  ]
})
export class MovieDetailModule { }