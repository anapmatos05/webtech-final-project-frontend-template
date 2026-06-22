import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './movie.service';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private readonly BACKEND_URL = `${environment.apiUrl}/favorites`;
  private favorites: any[] = [];

  constructor(private http: HttpClient) {
    this.loadFavorites();
  }

  // Carrega os favoritos do backend e guarda localmente
  private loadFavorites(): void {
    this.http.get<any[]>(this.BACKEND_URL).subscribe({
      next: (data) => this.favorites = data,
      error: (err) => console.error('Erro ao carregar favoritos:', err)
    });
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.BACKEND_URL);
  }
  // Adiciona um filme aos favoritos
  addFavorite(movie: Movie): void {
    this.http.post(this.BACKEND_URL, {
      movieId: movie.id.toString(),
      movieTitle: movie.title,
      moviePoster: movie.poster_path
    }).subscribe({
      next: (data) => this.favorites.push(data),
      error: (err) => console.error('Erro ao adicionar favorito:', err)
    });
  }
  // Remove um filme dos favoritos
  removeFavorite(movieId: number): void {
    const favorite = this.favorites.find(f => f.movieId === movieId.toString());
    if (!favorite) return;

    this.http.delete(`${this.BACKEND_URL}/${favorite.id}`).subscribe({
      next: () => this.favorites = this.favorites.filter(f => f.movieId !== movieId.toString()),
      error: (err) => console.error('Erro ao remover favorito:', err)
    });
  }
  // Verifica se um filme está nos favoritos
  isFavorite(movieId: number): boolean {
    return this.favorites.some(f => f.movieId === movieId.toString());
  }
}