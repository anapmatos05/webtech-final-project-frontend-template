import { Routes } from '@angular/router';

export const routes: Routes = [
  // Rota para a página inicial do teu colega (se a pasta se chamar Home)
  { 
    path: '', 
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) 
  },
  
  // A tua nova rota para a página de pesquisa
  { 
    path: 'search', 
    loadComponent: () => import('./search/search.component').then(m => m.SearchComponent) 
  },

  // Rota de segurança: se alguém ditar um URL que não existe, volta para o início
  { 
    path: '**', 
    redirectTo: '' 
  }
];