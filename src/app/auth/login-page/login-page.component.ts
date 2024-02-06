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



@Component({
  selector: 'login-page',
  standalone: true,
  imports: [CommonModule, FormsModule,GoogleLoginDirective,FbLoginDirective],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'] // Asegúrate de que la propiedad se llame styleUrls en plural
})

export class LoginPageComponent implements OnInit ,OnDestroy{ // Implementa la interfaz OnInit
  location!:GeolocationCoordinates;
email='';
password='';  
#router=inject(Router);//utilizar la inyeccion de las rutas
#authService=inject(AuthService);
#loadGoogle = inject(LoadGoogleApiService);
credentialsSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}
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
  
//SALTA LA PAG 34 AL INTENTAR HACER LOGIN
  login() {
    const LoginData: iLogin = {
    email:this.email, // Inicializa con valores vacíos o los que correspondan
    password:this.password,
    latitud :this.location.longitude,
    longitud:this.location.longitude,
  };
    console.log("Intentando iniciar sesión con:", LoginData);

    this.#authService
      .login(LoginData)
      .subscribe(() => this.#router.navigate(['/posts']));
  }

  register() {
    this.router.navigate(['/auth/register']); // Usa this.router para navegar
  }
  loggedFacebook(resp: fb.StatusResponse) {
    // Send this to your server
     this.#authService.loginFacebook({token:resp.authResponse.accessToken!,lat:this.location.latitude,lng:this.location.longitude})
      .subscribe(()=> this.#router.navigate(['/posts']))
    ;
  }

  showError(error: any) {
    console.error(error);
  }

}
