import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UserLogin, iLogin } from '../interfaces/user';
import { TokenResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged(): Observable<boolean> {
    if (!this.logged()) {
      if (!localStorage.getItem('token')) {
        return of(false);
      } 
      else {
        return this.#http.get<void>('auth/validate').pipe(
          map(() => {console.log("HEW ENTRADO EN AUTH/VALIDATE PERRAAAAAAAAAAAAAAAAAAAAA");
            this.#logged.set(true);
            return true;
          }),
          catchError(() => {console.log("no he entrado BASURAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA       AUTH/VALIDATE");
            localStorage.removeItem('token');
            return of(false);
          })
        );
      }
    }
    return of(true);
}
    
    
  

  #logged = signal(false);
  #http = inject(HttpClient);


  get logged() {
    return this.#logged.asReadonly(); // Señal de solo lectura
  }
//cuando se pulsa el boton de login , hay que invocar este metodopasandole el usuario(interfaz)password y coordenada y subscribirme
  login(data: iLogin ): Observable<void> {
    console.log("AQUI ESTA TU DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",data);
    return this.#http.post<TokenResponse>('auth/login', data).pipe(map(r => {
      localStorage.setItem("token", r.accessToken);
      console.log("AQUI ESTA TU TOKEN BASURAAAAAAAAAAAAAAAA",localStorage.getItem("token"))
      this.#logged.set(true);
    }))
  }

  logout() {
    localStorage.removeItem("token");
    this.#logged.set(false);
  }
  // Método para registrar un nuevo usuario
 register(data: UserLogin): Observable<unknown> {
  // Aquí se coloca el console.log para ver el objeto enviado
  console.log("Datos enviados al servidor PERRRRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:", data);

  return this.#http.post<unknown>('auth/register', data).pipe(
    map(response => {
      console.log("Registro exitoso", response);
      return response;
    }),
    catchError(error => {
      console.error("Error completo en el registro:", error);
      return of(null); // O manejar el error de una manera más específica
    })
  );
}

  
}
