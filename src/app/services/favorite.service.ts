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

  // Mudado para public para a Home conseguir chamar se for preciso
  public loadFavorites(): void {
    this.http.get<any[]>(this.BACKEND_URL).subscribe({
      next: (data) => {
        // Se a API devolver um objeto com .data, usamos .data, senão usamos o array direto
        this.favorites = Array.isArray(data) ? data : (data as any).data || [];
        console.log('Favoritos carregados:', this.favorites);
      },
      error: (err) => console.error('Erro ao carregar favoritos:', err)
    });
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.BACKEND_URL);
  }

  addFavorite(movie: Movie): void {
    this.http.post(this.BACKEND_URL, {
      movieId: movie.id.toString(),
      movieTitle: movie.title,
      moviePoster: movie.poster_path
    }).subscribe({
      next: (res: any) => {
        // Extrai o objeto real caso venha dentro de res.data
        const novoFavorito = res.data ? res.data : res;
        this.favorites.push(novoFavorito);
        console.log('Adicionado aos favoritos localmente:', novoFavorito);
      },
      error: (err) => console.error('Erro ao adicionar favorito:', err)
    });
  }

  removeFavorite(movieId: number): void {
    // Trata tanto 'id' como '_id' para o caso do MongoDB
    const favorite = this.favorites.find(f => f.movieId === movieId.toString());
    if (!favorite) return;

    const idParaDeletar = favorite.id || favorite._id;

    this.http.delete(`${this.BACKEND_URL}/${idParaDeletar}`).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(f => f.movieId !== movieId.toString());
        console.log('Removido dos favoritos:', movieId);
      },
      error: (err) => console.error('Erro ao remover favorito:', err)
    });
  }

  isFavorite(movieId: number): boolean {
    if (!this.favorites) return false;
    return this.favorites.some(f => f.movieId === movieId.toString());
  }
}