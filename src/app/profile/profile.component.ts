import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './../posts/services/auth.service'; // Ajusta la ruta según tu estructura de carpetas
import { UserLogin } from '../posts/interfaces/user';

@Component({
  selector: 'app-profile', // Asegúrate de que el selector sea único y siga las convenciones de nomenclatura
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class ProfileComponent implements OnInit {
  userProfile!: UserLogin;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (profile) => {  
        this.userProfile = profile;
      },
      error: (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    });
  }
}