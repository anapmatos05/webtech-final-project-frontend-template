import { Routes } from '@angular/router';

export const routes: Routes = [
  // Rota para a página inicial (Home)
  { 
    path: '', 
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) 
  },
  
  // Rota para a página de pesquisa
  { 
    path: 'search', 
    loadComponent: () => import('./search/search.component').then(m => m.SearchComponent) 
  },

  // A TUA ROTA ATUALIZADA (Carrega o teu NgModule)
  { 
    path: 'movie/:id', 
    loadChildren: () => import('./movie-detail/movie-detail.module').then(m => m.MovieDetailModule)
  },

  // Rota para a página de favoritos
  { 
    path: 'favorites', 
    loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule) 
  },

  // Rota de segurança (sempre no fim)
  { 
    path: '**', 
    redirectTo: '' 
  }
];