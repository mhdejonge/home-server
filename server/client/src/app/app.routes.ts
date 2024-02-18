import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { DirectoryComponent } from 'app/directory';
import { TokenService } from 'services';
import { LoginComponent } from './login/login.component';

const isLoggedIn: CanActivateFn = () => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const queryParams = router.url && router.url !== '/' ? { returnUrl: router.url } : null;
  return tokenService.isLoggedIn ? true : router.createUrlTree(['/login'], { queryParams });
};

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'storage',
    children: [
      {
        path: '**',
        component: DirectoryComponent
      }
    ],
    canActivate: [isLoggedIn],
    canActivateChild: [isLoggedIn]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'storage'
  }
];
