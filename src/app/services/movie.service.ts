import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../app.config'; // Importa a configuração diretamente do app.config

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  private baseUrl = environment.tmdbBaseUrl;
  private token = environment.tmdbToken;

  // Cabeçalhos HTTP para validar o teu token no TMDB
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'accept': 'application/json'
    });
  }

  /**
   * Obtém os filmes mais populares do momento
   */
  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular?language=pt-PT&page=1`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Pesquisa filmes por uma palavra-chave
   */
  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie?query=${encodeURIComponent(query)}&language=pt-PT&page=1`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Obtém todos os detalhes de um filme específico (sinopse, etc) pelo ID
   */
  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}?language=pt-PT`, {
      headers: this.getHeaders()
    });
  }
}