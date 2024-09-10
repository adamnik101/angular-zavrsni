import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  return authService.getUserRole().pipe(map(
    (response) => {
      if(response.data.name === 'admin') {
        return true;
      } else {
        router.navigateByUrl('/home');
        return false;
      }

    }
  ))
};
