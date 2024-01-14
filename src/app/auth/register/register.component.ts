import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { newUser } from '../../posts/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule,RegisterComponent,FormsModule],
  standalone : true
})
    export class RegisterComponent implements OnInit {
    nameModel: NgModel | undefined;
    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }
    newUser: unknown;
    validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
      return {
        [validClass]: ngModel.touched && ngModel.valid,
        [errorClass]: ngModel.touched && ngModel.invalid
      };
    }
    newUserEmail: unknown;
    validClassesEmail(ngModel: NgModel, validClass: string, errorClass: string) {
      return {
        [validClass]: ngModel.touched && ngModel.valid,
        [errorClass]: ngModel.touched && ngModel.invalid
      };
    }
    changeImage(event: Event) {
      const fileInput = event.target as HTMLInputElement;
      if (!fileInput.files || fileInput.files.length === 0)
      return ;
      
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newUser.avatar = reader.result as string;
    });
    }
}
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