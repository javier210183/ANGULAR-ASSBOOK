// profile.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module'; // Asegúrate de tener este archivo y que esté correctamente configurado

@NgModule({
 
  
  imports: [
    CommonModule,
    ProfileRoutingModule // Importa el módulo de enrutamiento de perfil aquí
  ]
})
export class ProfileModule { }
