import { User } from './user';

export interface Post {
  totalLikes: any;
  id?: number;
  title?: string;
  description?: string;
  mood: number;
  image?: string;
  date?: string;
  likes: boolean | null;
  lat?: number; // Opcional, para la geolocalización
  lng?: number; // Opcional, para la geolocalización
}
export interface Publicaciones extends Post {
  id?: number;
  date?: string;
  totalLikes: number;
  creator?: User;
  title?: string;
  description?: string;
  mood: number;
  image?: string;
  lat?: number; // Opcional, para la geolocalización
  lng?: number; // Opcional, para la geolocalización
  likes: boolean | null;
  mine?: boolean;
}