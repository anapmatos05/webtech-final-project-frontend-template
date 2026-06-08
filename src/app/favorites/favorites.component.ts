import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Movie, MovieService } from '../services/movie.service';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: Movie[] = [];
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

  // Vai buscar a lista de filmes guardados
  loadFavorites(): void {
    this.favoriteMovies = this.favoriteService.getFavorites();
  }

  // Remove o filme e atualiza a grelha automaticamente
  removeFromFavorites(movie: Movie, event: Event): void {
    event.stopPropagation(); // Impede que o clique abra a página do filme
    this.favoriteService.removeFavorite(movie.id);
    this.loadFavorites(); // Recarrega a lista para o filme desaparecer do ecrã
  }
}