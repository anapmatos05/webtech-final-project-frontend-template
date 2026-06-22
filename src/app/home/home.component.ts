import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService, Movie } from '../services/movie.service';
import { SearchModule } from '../search/search.module';
import { FavoriteService } from '../services/favorite.service';
import { WatchlistService } from '../services/watchlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';

  hasSearched = signal(false);

  constructor(
    private movieService: MovieService,
    private favoriteService: FavoriteService,
    private watchlistService: WatchlistService
  ) { }

  ngOnInit(): void {
    this.loadPopularMovies();

    // Tenta carregar os favoritos e a watchlist do backend logo ao iniciar a aplicação
    if (this.favoriteService && typeof (this.favoriteService as any).loadFavorites === 'function') {
      (this.favoriteService as any).loadFavorites();
    }
    if (this.watchlistService && typeof (this.watchlistService as any).loadWatchlist === 'function') {
      (this.watchlistService as any).loadWatchlist();
    }
  }

  loadPopularMovies(): void {
    this.isLoading = true;
    this.hasError = false;

    // Vai buscar a lista de filmes populares à API
    this.movieService.getPopularMovies().subscribe({
      next: (response) => {
        this.movies = response.results;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar filmes:', error);
        this.hasError = true;
        this.errorMessage = 'Não foi possível carregar os filmes. Tenta novamente.';
        this.isLoading = false;
      }
    });
  }

  getPosterUrl(posterPath: string | null): string {
    if (!posterPath) return 'assets/no-poster.png';
    return this.movieService.IMAGE_BASE_URL + posterPath;
  }

  getRatingClass(rating: number): string {
    if (rating >= 7) return 'rating-high';
    if (rating >= 5) return 'rating-medium';
    return 'rating-low';
  }

  setHasSearched(value: boolean): void {
    console.log('Valor recebido de SearchComponent:', value);
    this.hasSearched.set(value);
  }

  // Verifica se o coração deve estar pintado com pára-quedas para não congelar o HTML
  isFavorite(movieId: number): boolean {
    if (!this.favoriteService || typeof this.favoriteService.isFavorite !== 'function') {
      return false;
    }
    try {
      return this.favoriteService.isFavorite(movieId);
    } catch (e) {
      console.error('Erro ao verificar favoritos:', e);
      return false;
    }
  }

  // A função do botão de favorito
  toggleFavorite(movie: any, event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.isFavorite(movie.id)) {
      this.favoriteService.removeFavorite(movie.id);
    } else {
      this.favoriteService.addFavorite(movie);
    }
  }

  // Verifica se o filme está na watchlist com pára-quedas
  isInWatchlist(movieId: number): boolean {
    if (!this.watchlistService || typeof this.watchlistService.isInWatchlist !== 'function') {
      return false;
    }
    try {
      return this.watchlistService.isInWatchlist(movieId);
    } catch (e) {
      console.error('Erro ao verificar watchlist:', e);
      return false;
    }
  }

  // A função do botão da watchlist
  toggleWatchlist(movie: any, event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.isInWatchlist(movie.id)) {
      this.watchlistService.removeFromWatchlist(movie.id);
    } else {
      this.watchlistService.addToWatchlist(movie);
    }
  }
}