import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  UserLogin } from '../../posts/interfaces/user';
import { MyGeolocationService } from '../../posts/services/my-geolocation.service';
import { AuthService } from '../../posts/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule,RegisterComponent,FormsModule],
  standalone : true
})
export class RegisterComponent implements OnInit 
  {
  
      nameModel: NgModel | undefined;
    location: GeolocationCoordinates | undefined;
    newUserEmail: string = '';
    #router=inject(Router);
      
    async ngOnInit() {
      this.newUser = {
        name: '',
        lng: 0,
        lat: 0,
        avatar: '', // asignar el valor del avatar aquí
        email: '', // asignar el valor del email aquí
        password: '', // asignar el valor de la contraseña aquí
      };
      this.location = await MyGeolocationService.getLocation();
      this.newUser.lat = this.location.latitude;
      this.newUser.lng = this.location.longitude;
      console.log(
        'esta es tu ubicacion ACTUALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL: ',
        this.location
      );
    }
    constructor(private authService: AuthService) {} // Inyecta AuthService aquí

      newUser!: UserLogin;
      validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
        return {
          [validClass]: ngModel.touched && ngModel.valid,
          [errorClass]: ngModel.touched && ngModel.invalid
        };
     }
    
        validClassesEmail(ngModel: NgModel, validClass: string, errorClass: string) {
          return {
            [validClass]: ngModel.touched && ngModel.valid,
            [errorClass]: ngModel.touched && ngModel.invalid
          };
        }
        changeImage(event: Event) {
          const fileInput = event.target as HTMLInputElement;
          if (!fileInput.files || fileInput.files.length === 0) {
            return;
          }
          const file = fileInput.files[0];
          const reader = new FileReader();
          reader.onload = () => {
            this.newUser.avatar = reader.result as string; // Asume formato Base64
          };
          reader.readAsDataURL(file);
        }
        goBack() {
          this.#router.navigate(['/login']);
        }
        
        registerUser() {
   
          if (this.newUser.email !== this.newUserEmail) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Los emails no coinciden.',
            });
            console.log('Email:', this.newUser.email);
    console.log('Confirm Email:', this.newUserEmail);
            return;
          }
          
          this.authService.register(this.newUser).subscribe({
            next: (response) => {
              Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Tu cuenta ha sido creada con éxito.',
              })
              console.log('Registro exitoso', response);
              // Redirigir al usuario o mostrar mensaje de éxito
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error en el registro',
                text: 'No se pudo completar tu registro. Por favor, intenta de nuevo más tarde.',
              });
              console.error('Error en el registro', error);
              // Mostrar mensaje de error
              
            }
            
          });
          
  }
  
}
console.log("esta es tu ubicacion ACTUALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL: ", location);
/*

  formGroup: FormGroup | undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.sameAs('password')]],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      pais: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      // Enviar los datos al servidor
    }
  }

*/
