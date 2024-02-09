import { Routes } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "../profile/profile.component";
import { loginActivateGuardGuard } from "../login-activate-guard.guard";


export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile', // Agrega esta nueva ruta para el perfil
    component: ProfileComponent, // Asigna ProfileComponent a la ruta 'profile'
    canActivate: [loginActivateGuardGuard], // Puedes proteger esta ruta con un guardia de autenticación
  },
  
];
