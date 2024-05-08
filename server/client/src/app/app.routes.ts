import { inject } from '@angular/core';
import { CanActivateFn, Route, Router, Routes } from '@angular/router';
import { DirectoryComponent } from 'app/directory';
import { TokenService } from 'services';
import { LoginComponent } from './login/login.component';

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
        component: DirectoryComponent
      }
    ],
    canActivate: [isLoggedIn],
    canActivateChild: [isLoggedIn]
  };
};

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  filesRoute('files'),
  filesRoute('locked'),
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'files'
  }
];
