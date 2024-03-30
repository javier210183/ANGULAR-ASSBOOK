export interface UserLogin {

  id?: number;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  lat: number;
  lng: number;
  me?: boolean;

}
export interface iLogin {
  
  email: string;
  password: string;
  latitud?: number;
  longitud?: number;

}
export interface TokenLogin {
  token:string;
  lat?: number;
  lng?: number;
}
export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  lat: number;
  lng: number;
  me?: boolean;
}