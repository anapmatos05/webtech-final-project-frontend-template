import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  private movieService = inject(MovieService);

  searchQuery: string = '';
  searchResults: any[] = [];
  isLoading: boolean = false;
  hasSearched: boolean = false;

  onSearch(): void {
    if (!this.searchQuery.trim()) return;

    this.isLoading = true;
    this.hasSearched = true;

    this.movieService.searchMovies(this.searchQuery).subscribe({
      next: (data) => {
        this.searchResults = data.results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao pesquisar filmes:', err);
        this.isLoading = false;
      }
    });
  }
}