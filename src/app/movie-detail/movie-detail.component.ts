import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { MovieService, Movie } from '../services/movie.service';
import { FavoriteService } from '../services/favorite.service'; // O serviço do localStorage

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

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private favoriteService: FavoriteService,
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
      this.favoriteService.removeFavorite(this.movie.id);
      this.isFav = false;
    } else {
      this.favoriteService.addFavorite(this.movie);
      this.isFav = true;
    }
  }
}