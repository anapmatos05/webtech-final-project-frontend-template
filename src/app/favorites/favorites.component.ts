import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: any[] = [];
  imageBaseUrl: string = '';

  constructor(
    private favoriteService: FavoriteService,
    private movieService: MovieService
  ) {
    this.imageBaseUrl = this.movieService.IMAGE_BASE_URL;
  }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteService.getFavorites().subscribe({
      next: (favorites) => {
        this.favoriteMovies = favorites;
      },
      error: (err: any) => {
        console.error('Erro ao carregar favoritos:', err);
      }
    });
  }
  // Função para remover um filme dos favoritos
  removeFromFavorites(movie: any, event: Event): void {
    event.stopPropagation();
    this.favoriteService.removeFavorite(movie.id);
    this.loadFavorites();
  }
}