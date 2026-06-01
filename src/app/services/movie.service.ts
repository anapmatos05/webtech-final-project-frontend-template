import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private readonly API_KEY = 'd9bfc43c23a285354b0c14289aea0ad6'; // Substitui pela tua API key do TMDB
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  readonly IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

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
}