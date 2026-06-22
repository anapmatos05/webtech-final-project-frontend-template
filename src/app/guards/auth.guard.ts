import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se o utilizador tiver os dados guardados no serviço (logado), tem autorização
  if (authService.currentUserValue) {
    return true;
  }

  // Se não estiver logado, é empurrado para a página de login
  router.navigate(['/login']);
  return false;
};