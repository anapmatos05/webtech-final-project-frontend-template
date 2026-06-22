import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../services/watchlist.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-watchlist',
  standalone: false,
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlistMovies: any[] = [];
  imageBaseUrl: string = '';
  // 1. Injetar os serviços necessários no construtor
  constructor(
    private watchlistService: WatchlistService,
    private movieService: MovieService
  ) {
    this.imageBaseUrl = this.movieService.IMAGE_BASE_URL;
  }

  ngOnInit(): void {
    this.loadWatchlist();
  }
  // Função para carregar a watchlist do usuário
  loadWatchlist(): void {
    this.watchlistService.getWatchlist().subscribe({
      next: (watchlist) => {
        this.watchlistMovies = watchlist;
      },
      error: (err) => {
        console.error('Erro ao carregar watchlist:', err); // Exibe o erro no console para depuração
      }
    });
  }
  // Função para remover um filme da watchlist
  removeFromWatchlist(movie: any, event: Event): void {
    event.stopPropagation();
    this.watchlistService.removeFromWatchlist(movie._id);
    this.loadWatchlist();
  }
}