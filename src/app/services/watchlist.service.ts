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

    // Mudado para public para a Home conseguir chamar se for preciso
    public loadWatchlist(): void {
        this.http.get<any[]>(this.BACKEND_URL).subscribe({
            next: (data) => {
                this.watchlist = Array.isArray(data) ? data : (data as any).data || [];
                console.log('Watchlist carregada:', this.watchlist);
            },
            error: (err) => console.error('Erro ao carregar watchlist:', err)
        });
    }

    getWatchlist(): Observable<any[]> {
        return this.http.get<any[]>(this.BACKEND_URL);
    }

    addToWatchlist(movie: Movie, status: string = 'pending'): void {
        this.http.post(this.BACKEND_URL, {
            movieId: movie.id.toString(),
            movieTitle: movie.title,
            moviePoster: movie.poster_path,
            status
        }).subscribe({
            next: (res: any) => {
                const novoItem = res.data ? res.data : res;
                this.watchlist.push(novoItem);
                console.log('Adicionado à watchlist localmente:', novoItem);
            },
            error: (err) => console.error('Erro ao adicionar à watchlist:', err)
        });
    }

    removeFromWatchlist(movieId: number): void {
        const item = this.watchlist.find(w => w.movieId === movieId.toString());
        if (!item) return;

        const idParaDeletar = item.id || item._id;

        this.http.delete(`${this.BACKEND_URL}/${idParaDeletar}`).subscribe({
            next: () => {
                this.watchlist = this.watchlist.filter(w => w.movieId !== movieId.toString());
                console.log('Removido da watchlist:', movieId);
            },
            error: (err) => console.error('Erro ao remover da watchlist:', err)
        });
    }

    updateStatus(id: string, status: string): Observable<any> {
        return this.http.put(`${this.BACKEND_URL}/${id}`, { status });
    }

    isInWatchlist(movieId: number): boolean {
        if (!this.watchlist) return false;
        return this.watchlist.some(w => w.movieId === movieId.toString());
    }
}