import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

const PUBLIC_PATHS = ['/api/auth/login', '/api/auth/refresh', '/api/auth/register'];

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const isPublic = PUBLIC_PATHS.some(path => req.url.includes(path));
  const token = auth.getAccessToken();

  const authReq = (!isPublic && token)
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isPublic) {
        auth.logout();
      }
      return throwError(() => error);
    })
  );
};