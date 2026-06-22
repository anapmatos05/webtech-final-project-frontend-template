import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService, Movie } from '../services/movie.service';
import { FavoriteService } from '../services/favorite.service'; // O serviço do localStorage
import { WatchlistService } from '../services/watchlist.service'; // O serviço do localStorage para a watchlist

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | undefined;
  imageBaseUrl: string = '';
  isFav: boolean = false; // A variável que controla o botão do coração
  isInWatchlist: boolean = false; // A variável que controla o botão da watchlist

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private favoriteService: FavoriteService,
    private watchlistService: WatchlistService,
    private location: Location
  ) {
    this.imageBaseUrl = this.movieService.IMAGE_BASE_URL;
  }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.movieService.getMovieDetails(id).subscribe({
        next: (data) => {
          this.movie = data;
          // Verifica se o filme já está nos favoritos
          this.isFav = this.favoriteService.isFavorite(this.movie.id);
          this.isInWatchlist = this.watchlistService.isInWatchlist(this.movie.id); // Verifica se o filme já está na watchlist
        },
        error: (erro) => {
          console.error('Erro ao carregar os detalhes do filme:', erro);
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  toggleFavorite(): void {
    if (!this.movie) return;

    if (this.isFav) {
      this.favoriteService.removeFavorite(this.movie.id.toString());
      this.isFav = false;
    } else {
      this.favoriteService.addFavorite(this.movie);
      this.isFav = true;
    }
  }
  toggleWatchlist(): void {
    console.log('clicou watchlist', this.movie);
    if (!this.movie) return;
    if (this.isInWatchlist) {
      this.watchlistService.removeFromWatchlist(this.movie.id.toString());
      this.isInWatchlist = false;
    } else {
      this.watchlistService.addToWatchlist(this.movie);
      this.isInWatchlist = true;
    }
  }
}
