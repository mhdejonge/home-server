import { inject } from '@angular/core';
import { CanActivateFn, Route, Router, Routes } from '@angular/router';
import { AuthComponent } from 'app/auth';
import { NasComponent } from 'app/nas';
import { TokenService } from 'services';

const isLoggedIn: CanActivateFn = () => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const queryParams = router.url && router.url !== '/' ? { returnUrl: router.url } : null;
  return tokenService.isLoggedIn ? true : router.createUrlTree(['/login'], { queryParams });
};

const filesRoute = (basePath: string): Route => {
  return {
    path: basePath,
    children: [
      {
        path: '**',
        data: { basePath },
        component: NasComponent
      }
    ],
    canActivate: [isLoggedIn],
    canActivateChild: [isLoggedIn]
  };
};

export const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent
  },
  filesRoute('files'),
  filesRoute('locked'),
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'files'
  }
];
