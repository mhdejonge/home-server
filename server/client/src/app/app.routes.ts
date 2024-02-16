import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { DirectoryComponent } from 'app/directory';
import { TokenService } from 'services';
import { LoginComponent } from './login/login.component';

const isLoggedIn: CanActivateFn = () => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  return tokenService.isLoggedIn ? true : router.createUrlTree(['/login'], {
    queryParams: {
      returnUrl: router.url
    }
  });
}

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'prefix',
    component: LoginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: DirectoryComponent,
    canActivate: [isLoggedIn]
  }
];
