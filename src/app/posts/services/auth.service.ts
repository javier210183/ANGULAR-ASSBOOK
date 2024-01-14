import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UserLogin } from '../interfaces/user';
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
          map(() => {
            this.#logged.set(true);
            return true;
          }),
          catchError(() => {
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

  login(data: UserLogin): Observable<void> {
    return this.#http.post<TokenResponse>('auth/login', data).pipe(map(r => {
      localStorage.setItem("token", r.accesToken);
      this.#logged.set(true);
    }))
  }

  logout() {
    localStorage.removeItem("token");
    this.#logged.set(false);
  }
  
}
