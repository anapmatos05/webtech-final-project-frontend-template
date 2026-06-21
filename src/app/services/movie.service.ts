import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly API_KEY = 'd9bfc43c23a285354b0c14289aea0ad6'; 
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  readonly IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  // Configuração do teu próprio Backend Node.js (Reviews)
  private readonly BACKEND_URL = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) { }

  getPopularMovies(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.BASE_URL}/movie/popular?api_key=${this.API_KEY}&language=pt-PT&page=${page}`
    );
  }

  searchMovies(query: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&language=pt-PT&query=${query}`
    );
  }

  getMovieDetails(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.BASE_URL}/movie/${id}?api_key=${this.API_KEY}&language=pt-PT`
    );
  }

  // ==========================================
  //  MÉTODOS DO TEU BACKEND 
  // ==========================================

  //  Criar uma Review (POST)
  criarReview(dadosReview: any): Observable<any> {
    return this.http.post(this.BACKEND_URL, dadosReview);
  }

  //  Editar uma Review (PUT)
  editarReview(id: string, dadosAtualizados: any): Observable<any> {
    return this.http.put(`${this.BACKEND_URL}/${id}`, dadosAtualizados);
  }

  // Remover uma Review (DELETE)
  removerReview(id: string): Observable<any> {
    return this.http.delete(`${this.BACKEND_URL}/${id}`);
  }
}