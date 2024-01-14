import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../posts/services/auth.service';

export const logoutActivateGuardGuard: CanActivateFn = () => {
  const auth = inject (AuthService);
  const router = inject (Router);
  return auth.isLogged().pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        // Si el usuario no está autenticado, redirige a la página de login
        return router.createUrlTree(['/post']);
      }
      // Si el usuario está autenticado, permite el acceso
      return true;
    })
  );
};
