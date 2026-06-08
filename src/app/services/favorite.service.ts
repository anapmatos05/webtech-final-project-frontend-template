import { Injectable } from '@angular/core';
import { Movie } from './movie.service'; // Importamos a estrutura do filme da Ana

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  // O "nome da gaveta" onde vamos guardar os filmes no navegador
  private readonly STORAGE_KEY = 'cinetrack_favoritos';

  constructor() { }

  // 1. Ler os favoritos guardados
  getFavorites(): Movie[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved); // Transforma o texto guardado de volta num Array
    }
    return [];
  }

  // 2. Adicionar um filme
  addFavorite(movie: Movie): void {
    const favorites = this.getFavorites();
    // Confirma se o filme já não está na lista para não haver repetidos
    if (!favorites.find(m => m.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    }
  }

  // 3. Remover um filme
  removeFavorite(movieId: number): void {
    let favorites = this.getFavorites();
    // Filtra e guarda todos, EXCETO o que queremos apagar
    favorites = favorites.filter(m => m.id !== movieId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
  }

  // 4. Verificar se um filme já é favorito (para pintar o coração)
  isFavorite(movieId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some(m => m.id === movieId);
  }
}
