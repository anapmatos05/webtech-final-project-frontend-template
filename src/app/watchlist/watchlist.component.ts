import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../services/watchlist.service';
import { Movie, MovieService } from '../services/movie.service';

@Component({
  selector: 'app-watchlist',
  standalone: false,
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlistMovies: Movie[] = [];
  imageBaseUrl: string = '';

  constructor(
    private watchlistService: WatchlistService,
    private movieService: MovieService
  ) {
    this.imageBaseUrl = this.movieService.IMAGE_BASE_URL;
  }

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist(): void {
    this.watchlistMovies = this.watchlistService.getWatchlist();
  }

  removeFromWatchlist(movie: Movie, event: Event): void {
    event.stopPropagation();
    this.watchlistService.removeFromWatchlist(movie.id);
    this.loadWatchlist();
  }
}