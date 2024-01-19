import { HttpInterceptorFn } from "@angular/common/http";

export const interceptors: HttpInterceptorFn[] = [
    (req, next) =>{
        const auth = localStorage.getItem('access-token');
        if (auth) {
            req = req.clone({setHeaders: {Authorization: auth} });
        }
        return next(req);
    }
]
