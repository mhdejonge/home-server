import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from 'services';

export const interceptors: HttpInterceptorFn[] = [
    (request, next) => {
        const token = inject(TokenService).accessToken
        if (token) {
            request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }
        return next(request);
    }
]
