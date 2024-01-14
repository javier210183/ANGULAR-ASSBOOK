import { Routes } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterComponent } from "./register/register.component";


export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
