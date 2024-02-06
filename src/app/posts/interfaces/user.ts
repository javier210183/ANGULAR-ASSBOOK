export interface UserLogin {
  name:string;
  avatar: string;
  email: string;
  password: string;
  latitud?: number;
  longitud?: number;
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