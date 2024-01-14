import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../posts/services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const loginActivateGuardGuard: CanActivateFn = () => {
  const auth = inject (AuthService);
  const router = inject (Router);
  return auth.isLogged().pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        // Si el usuario no está autenticado, redirige a la página de login
        return router.createUrlTree(['/auth','login']);
      }
      // Si el usuario está autenticado, permite el acceso
      return true;
    })
  );
};
