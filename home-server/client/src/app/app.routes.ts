import { Routes } from '@angular/router';
import { DirectoryComponent } from "app/directory";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DirectoryComponent
  }
];
