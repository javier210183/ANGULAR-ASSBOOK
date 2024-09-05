import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
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
          map(() => {console.log("HEW ENTRADO EN AUTH/VALIDATE ");
            this.#logged.set(true);
            return true;
          }),
          catchError(() => {console.log("no he entrado       AUTH/VALIDATE");
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
   // console.log("AQUI ESTA TU DATA",data);
    return this.#http.post<TokenResponse>('auth/login', data).pipe(map(r => {
      localStorage.setItem("token", r.accessToken);
     // console.log("AQUI ESTA TU TOKEN ",localStorage.getItem("token"))
      this.#logged.set(true);
    }))
  }
  loginGoogle(data: TokenLogin ): Observable<void> {
    //console.log("AQUI ESTA TU DATA",data);
    return this.#http.post<TokenResponse>('auth/google', data).pipe(map(r => {
      localStorage.setItem("token", r.accessToken);
      //console.log("AQUI ESTA TU TOKEN ",localStorage.getItem("token"))
      this.#logged.set(true);
    }))
  }
  loginFacebook(data: TokenLogin ): Observable<void> {
   // console.log("AQUI ESTA TU DATA",data);
    return this.#http.post<TokenResponse>('auth/facebook', data).pipe(map(r => {
      localStorage.setItem("token", r.accessToken);
      //console.log("AQUI ESTA TU TOKEN ",localStorage.getItem("token"))
      this.#logged.set(true);
    }))
  }

  logout() {
    localStorage.removeItem("token");
    this.#logged.set(false);
  }
  register(data: UserLogin): Observable<UserLogin> {
   // console.log("Datos enviados al servidor:", data);
  
    return this.#http.post<UserLogin>('auth/register', data).pipe(
      map(response => {
        console.log("Registro exitoso", response);
        return response;
      }),
      catchError(error => {
        // En lugar de simplemente imprimir el error y retornar null, propagamos el error
        return throwError(() => error);
      })
    );
  }
isAuthenticated(): boolean {
  const token = localStorage.getItem('token');
 //creado para guardian , saber si esta autenticado  y darle permisoso para ver las diferentes partes de la web
  return !!token;
}
getProfile(): Observable<UserLogin> {
 
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


changePassword(data: {  password: string }): Observable<any> {
 // console.log("VOY A ENVIAR EL DATA :",data);
  return this.#http.put('users/me/password', data);
}



// Actualizar el avatar del usuario
updateAvatar(data: {  avatar: string}): Observable<any> {
  //const formData = new FormData();
  //formData.append('avatar', file);
  //console.log("VOY A ENVIAR EL AVATAR :", data);

  return this.#http.put('users/me/avatar', data);
}
    
  }




