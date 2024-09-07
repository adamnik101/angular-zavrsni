import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

const STATUS_CODES_FOR_LOGOUT: number[] = [401,403];

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);


  return next(req).pipe(catchError(err => {
    if(STATUS_CODES_FOR_LOGOUT.includes(err.status)) {
      clearUser();
      router.navigateByUrl("/login");

    }
    return throwError(() => err);
  }));
};

function clearUser() {
  localStorage.removeItem('token');
}
