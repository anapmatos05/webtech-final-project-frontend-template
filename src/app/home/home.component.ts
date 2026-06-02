import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService, Movie } from '../services/movie.service';
import { SearchComponent } from '../search/search.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';

  hasSearched = signal(false);


  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadPopularMovies();
  }

  loadPopularMovies(): void {
    this.isLoading = true;
    this.hasError = false;

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
}