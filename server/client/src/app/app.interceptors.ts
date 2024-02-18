import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { makeApiPath } from 'functions';
import { TokenService } from 'services';

export const interceptors: HttpInterceptorFn[] = [
  (request, next) => {
    request = request.clone({ url: makeApiPath(request.url) });
    return next(request);
  },
  (request, next) => {
    const token = inject(TokenService).accessToken;
    if (token) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    return next(request);
  }
];
