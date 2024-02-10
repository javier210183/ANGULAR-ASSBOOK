import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

export const profileRoutes: Routes = [
  {
    path: 'me',
    component: ProfileComponent,
  },
  //{
  //    path: ':id',
  // component: LoginPageComponent, // PROFILE DE OTROS
  //},
];
