import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './../posts/services/auth.service'; // Ajusta la ruta según tu estructura de carpetas
import { UserLogin } from '../posts/interfaces/user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Coordinates } from '../posts/interfaces/Coordinates';
import { BmMapDirective } from '../bingmaps/bm-map.directive';
import { BmMarkerDirective } from '../bingmaps/bm-marker.directive';
import { BmAutosuggestDirective } from '../bingmaps/bm-autosuggest.directive';

@Component({
  selector: 'app-profile', // Asegúrate de que el selector sea único y siga las convenciones de nomenclatura
  standalone: true,
  imports: [CommonModule,FormsModule,BmMapDirective,BmMarkerDirective,BmAutosuggestDirective,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] 
})
export class ProfileComponent implements OnInit,OnDestroy {


  userProfile!: UserLogin;
  coordinates: Coordinates = { latitude: 38.3245, longitude: -0.5 };
  name: string = '';
  email: string = '';
  avatarUrl: string = '';
  updatedName: string = '';
  updatedEmail: string = '';
  currentPassword: string = '';
  newPassword: string = '';

  showEditProfileForm: boolean = false; // Controla la visibilidad del formulario de edición de perfil
  showEditPasswordForm: boolean = false; // Controla la visibilidad del formulario de cambio de contraseña
  toggleEditProfileForm(): void {
    this.showEditProfileForm = !this.showEditProfileForm;
  }

  toggleEditPasswordForm(): void {
    this.showEditPasswordForm = !this.showEditPasswordForm;
  }

  constructor(private authService: AuthService) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
    
  }

  updateCoordinates(lat: number, lng: number) {
    // Adaptamos 'coordinates' para cumplir con la interfaz esperada
    const coords: Coordinates = { latitude: lat, longitude: lng };
    this.moveMap(coords);
  }
  loadUserProfile(): void {
    this.authService.getProfile().subscribe({
      next: (response: any) => { // Cambio aquí para aceptar cualquier tipo
        console.log("Respuesta completa de profile:", response);
        this.userProfile = response.user; // Accede a través de la propiedad 'user'
        this.name = response.user.name; // Ahora sí, accedemos a 'name'
        this.email = response.user.email; // Y aquí accedemos a 'email'
        this.avatarUrl = response.user.avatar;
        console.log("TU NOMBRE : ", this.name);
        console.log("TU EMAIL : ", this.email);
        console.log("URL del avatar:", this.avatarUrl);
        console.log("ESTE ES TU USUARIOOOOOO   : ",response.user);
      },
      error: (error) => console.error('Error obtaining user profile:', error),
    });
  }
  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (profile) => {  
        this.userProfile = profile;
        // Ajusta la asignación aquí para adaptarse a la interfaz 'Coordinates'
        this.updateCoordinates(profile.lat, profile.lng);
        console.log("Profile:", profile);
        this.loadUserProfile();
      },
      error: (error) => {
        console.error('Error obtaining user profile:', error);
      }
    });
  }
  moveMap(coords: Coordinates) {
    this.coordinates = coords;
  }
  updateProfile(): void {
    console.log("Updating profile with:", this.userProfile);
    // Implementa la llamada al servicio para actualizar el perfil
    // Ejemplo: this.authService.updateProfile(this.userProfile).subscribe(success => {...}, error => {...});
  }

 // Cambio de Avatar
changeAvatar(event: Event): void {
  const element = event.target as HTMLInputElement;
  if (element.files && element.files.length > 0) {
    const file = element.files[0];
    const reader = new FileReader();
          reader.onload = () => {
            this.avatarUrl = reader.result as string; // Asume formato Base64
          };
          reader.readAsDataURL(file);
    console.log("ESTE ES TU AVATARURL :",this.avatarUrl);
    this.authService.updateAvatar({avatar : this.avatarUrl}).subscribe({
      next: (user) => {
        console.log(" HE CAMBIADO EL AVATAR Y ME DEVUELVE :", user);
        // Actualizar la UI con el nuevo avatar
        this.avatarUrl = user.avatar;
      },
      error: (error) => console.error('Error updating avatar', error)
    });
  }
}

   // Actualización de Perfil
updateUserProfile(): void {
  // Asume que updatedName y updatedEmail son propiedades en tu componente vinculadas a los inputs del formulario
  this.authService.updateProfile({ name: this.updatedName, email: this.updatedEmail }).subscribe({
    next: () => {
      this.loadUserProfile(); // Recarga los datos del perfil
      this.showEditProfileForm = false; // Oculta el formulario después de la actualización
      console.log("Perfil actualizado con éxito.");
    },
    error: (error) => console.error('Error updating profile', error)
  });
}

changeUserPassword(): void {
  const data = {
    
    password: this.newPassword
  };

  this.authService.changePassword(data).subscribe({
    next: (response : any) => {
      console.log('Password changed successfully');
      console.log("este es tu response :",response);
      // Resto de tu lógica de éxito
    },
    error: (error) => {
      console.error('Error changing password', error);
      // Resto de tu lógica de error
    }
  });
}


}