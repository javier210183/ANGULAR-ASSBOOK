import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../posts/services/auth.service';
import {  iLogin } from '../../posts/interfaces/user';
import { MyGeolocationService } from '../../posts/services/my-geolocation.service';
import { LoadGoogleApiService } from '../google-login/load-google-api.service';
import { Subscription } from 'rxjs';
import { GoogleLoginDirective } from '../google-login/google-login.directive';
import { FbLoginDirective } from '../facebook-login/fb-login.directive';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';



@Component({
  selector: 'login-page',
  standalone: true,
  imports: [CommonModule, FormsModule,GoogleLoginDirective,FbLoginDirective,SweetAlert2Module],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'] 
})

export class LoginPageComponent implements OnInit ,OnDestroy{ 
  location!:GeolocationCoordinates;
email='';
password='';  
#router=inject(Router);
#authService=inject(AuthService);
#loadGoogle = inject(LoadGoogleApiService);
credentialsSub!: Subscription;

  constructor(private authService: AuthService, private router: Router,) {}
  async ngOnInit(): Promise<void> {
    this.location=await MyGeolocationService.getLocation();
    this.credentialsSub = this.#loadGoogle.credential$.subscribe(
      resp => this.#authService.loginGoogle({token:resp.credential,lat:this.location.latitude,lng:this.location.longitude})
      .subscribe(()=> this.#router.navigate(['/posts']))
    );
  }
  ngOnDestroy(): void {
    this.credentialsSub.unsubscribe();
}
  validClassesEmail(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }
  

    login() {
      const LoginData: iLogin = {
        email: this.email,
        password: this.password,
        latitud: this.location.latitude,
        longitud: this.location.longitude,
      };

     

      this.#authService.login(LoginData).subscribe({
        next: () => {
          
          this.#router.navigate(['/posts']);
        },
        error: (error) => {
          
          // El mensaje de error se obtiene del objeto de respuesta del error HTTP
          const message = error.error?.message || 'Error desconocido al intentar iniciar sesión.';
          this.showError(message);
        }
      });
    }

  register() {
    this.router.navigate(['/auth/register']); 
  }
  loggedFacebook(resp: fb.StatusResponse) {
    // Send this to your server
     this.#authService.loginFacebook({token:resp.authResponse.accessToken!,lat:this.location.latitude,lng:this.location.longitude})
      .subscribe(()=> this.#router.navigate(['/posts']))
    ;
  }

  showError(message: string) {
    console.error(message);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }
  

}
