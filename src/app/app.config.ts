import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor';

// Guardamos as configurações da API do TMDB aqui
export const environment = {
  production: false,
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  tmdbToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWJmYzQzYzIzYTI4NTM1NGIwYzE0Mjg5YWVhMGFkNiIsIm5iZiI6MTc3OTExMDk4OC4wNDQsInN1YiI6IjZhMGIxNDRjZTljNTI5YjBiMDRlNjRhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BvIyEkO5d2qMt8vUbMa6Xedpa91hVSmSUWDX4lw0M2A'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])) // Isto ativa os pedidos HTTP para a internet na aplicação inteira!
  ]
};