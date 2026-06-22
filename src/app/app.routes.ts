import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard'; // <-- Importa o teu novo guard

export const routes: Routes = [
  // Rota para a página inicial (Home) - TRANCADA
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },

  // Rotas de Autenticação - Livres para qualquer pessoa aceder
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },

  // Rota para a página de pesquisa - TRANCADA
  {
    path: 'search',
    canActivate: [authGuard],
    loadComponent: () => import('./search/search.component').then(m => m.SearchComponent)
  },

  // Rota de Detalhes - TRANCADA
  {
    path: 'movie/:id',
    canActivate: [authGuard],
    loadChildren: () => import('./movie-detail/movie-detail.module').then(m => m.MovieDetailModule)
  },

  // Rota para a página de favoritos - TRANCADA
  {
    path: 'favorites',
    canActivate: [authGuard],
    loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule)
  },

  // Rota para a página de watchlist - TRANCADA
  {
    path: 'watchlist',
    canActivate: [authGuard],
    loadChildren: () => import('./watchlist/watchlist.module').then(m => m.WatchlistModule)
  },

  // Rota de segurança (sempre no fim)
  {
    path: '**',
    redirectTo: ''
  }
];