import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

const STATUS_CODES_FOR_LOGOUT: number[] = [401,403];

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(catchError(err => {
    if(STATUS_CODES_FOR_LOGOUT.includes(err.status)) {
      clearUser();
    }
    return throwError(() => err);
  }));
};

function clearUser() {
  localStorage.removeItem('token');
}
