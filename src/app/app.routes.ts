import { Routes } from '@angular/router';
import {logoutActivateGuardGuard} from './guards/logout-activate-guard.guard';
import {loginActivateGuardGuard} from './guards/login-activate-guard.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate:[logoutActivateGuardGuard],
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
  },
  {
    path: 'posts',
    canActivate:[loginActivateGuardGuard],
    loadChildren: () => import('./posts/posts.routes').then(m => m.postsRoutes),
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
  {
    path: 'profile',
    canActivate:[loginActivateGuardGuard],
    loadChildren: () => import('./auth/profile/profile.module').then(m => m.ProfileModule),
  },

];
