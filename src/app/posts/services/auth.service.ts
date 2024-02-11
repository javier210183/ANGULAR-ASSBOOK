import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { TokenLogin, UserLogin, iLogin } from '../interfaces/user';
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
  loginGoogle(data: TokenLogin ): Observable<void> {
    console.log("AQUI ESTA TU DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",data);
    return this.#http.post<TokenResponse>('auth/google', data).pipe(map(r => {
      localStorage.setItem("token", r.accessToken);
      console.log("AQUI ESTA TU TOKEN BASURAAAAAAAAAAAAAAAA",localStorage.getItem("token"))
      this.#logged.set(true);
    }))
  }
  loginFacebook(data: TokenLogin ): Observable<void> {
    console.log("AQUI ESTA TU DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",data);
    return this.#http.post<TokenResponse>('auth/facebook', data).pipe(map(r => {
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
  console.log("Datos enviados al servidor PERAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:", data);

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
isAuthenticated(): boolean {
  const token = localStorage.getItem('token');
 //creado para guardian , saber si esta autenticado  y darle permisoso para ver las diferentes partes de la web
  return !!token;
}
getProfile(): Observable<UserLogin> {
  // Asumiendo que la URL base es la misma que se usa para el login, solo cambia el endpoint final.
  const url = 'users/me'; 
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No autenticado');
  }

  return this.#http.get<UserLogin>(url, {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  });
}
// Actualizar perfil
updateProfile(data: { name: string; email: string }): Observable<UserLogin> {
  
  return this.#http.put<UserLogin>('users/me', data);
}


changePassword(data: { oldPassword: string, newPassword: string }): Observable<any> {
  return this.#http.put('users/me/password', data);
}



// Actualizar el avatar del usuario
updateAvatar(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('avatar', file);

  return this.#http.put('users/me/avatar', formData);
}
    
  }




