import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './movie.service';
import { environment } from '../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class WatchlistService {
    private readonly BACKEND_URL = `${environment.apiUrl}/watchlist`;
    private watchlist: any[] = [];

    constructor(private http: HttpClient) {
        this.loadWatchlist();
    }

    // Carrega a watchlist do backend e guarda localmente
    private loadWatchlist(): void {
        this.http.get<any[]>(this.BACKEND_URL).subscribe({
            next: (data) => this.watchlist = data,
            error: (err) => console.error('Erro ao carregar watchlist:', err)
        });
    }
    // Retorna a watchlist do utiizador
    getWatchlist(): Observable<any[]> {
        return this.http.get<any[]>(this.BACKEND_URL);
    }
    // Adiciona um filme à watchlist
    addToWatchlist(movie: Movie, status: string = 'pending'): void {
        this.http.post(this.BACKEND_URL, {
            movieId: movie.id.toString(),
            movieTitle: movie.title,
            moviePoster: movie.poster_path,
            status
        }).subscribe({
            next: (data) => this.watchlist.push(data),
            error: (err) => console.error('Erro ao adicionar à watchlist:', err)
        });
    }
    // Remove um filme da watchlist
    removeFromWatchlist(movieId: number): void {
        const item = this.watchlist.find(w => w.movieId === movieId.toString());
        if (!item) return;

        this.http.delete(`${this.BACKEND_URL}/${item.id}`).subscribe({
            next: () => this.watchlist = this.watchlist.filter(w => w.movieId !== movieId.toString()),
            error: (err) => console.error('Erro ao remover da watchlist:', err)
        });
    }
    // Atualiza o status de um filme na watchlist
    updateStatus(id: string, status: string): Observable<any> {
        return this.http.put(`${this.BACKEND_URL}/${id}`, { status });
    }
    // Verifica se um filme está na watchlist
    isInWatchlist(movieId: number): boolean {
        return this.watchlist.some(w => w.movieId === movieId.toString());
    }
}