import { Component, inject, output } from '@angular/core';
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

  // Output para avisar a Home se temos resultados válidos para mostrar
  setHasSearchedoutput = output<boolean>();

  onQueryChange(): void {
    if (!this.searchQuery.trim()) {
      this.clearSearch();
    }
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.clearSearch();
      return;
    }

    this.isLoading = true;
    this.hasSearched = true;

    this.movieService.searchMovies(this.searchQuery).subscribe({
      next: (data) => {
        this.searchResults = data.results || [];
        this.isLoading = false;

        // Só dizemos à Home para esconder os populares se tivermos encontrado filmes!
        if (this.searchResults.length > 0) {
          this.setHasSearchedoutput.emit(true);
        } else {
          this.setHasSearchedoutput.emit(false);
        }
      },
      error: (err) => {
        console.error('Erro ao pesquisar filmes:', err);
        this.isLoading = false;
        this.setHasSearchedoutput.emit(false);
      }
    });
  }

  private clearSearch(): void {
    this.searchResults = [];
    this.hasSearched = false;
    this.isLoading = false;
    this.setHasSearchedoutput.emit(false); // Mostra sempre os populares
  }
}