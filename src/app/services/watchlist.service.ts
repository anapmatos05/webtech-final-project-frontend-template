import { Injectable } from '@angular/core';
import { Movie } from './movie.service';

@Injectable({
    providedIn: 'root'
})
export class WatchlistService {
    private readonly STORAGE_KEY = 'cinetrack_watchlist';

    constructor() { }

    getWatchlist(): Movie[] {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
        return [];
    }

    addToWatchlist(movie: Movie): void {
        const watchlist = this.getWatchlist();
        if (!watchlist.find(m => m.id === movie.id)) {
            watchlist.push(movie);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(watchlist));
        }
    }

    removeFromWatchlist(movieId: number): void {
        let watchlist = this.getWatchlist();
        watchlist = watchlist.filter(m => m.id !== movieId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(watchlist));
    }

    isInWatchlist(movieId: number): boolean {
        const watchlist = this.getWatchlist();
        return watchlist.some(m => m.id === movieId);
    }
}