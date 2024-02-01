export interface Post {
  id?: number;
  title?: string;
  description?: string;
  mood: number;
  image?: string;
  date?: string;
  likes: boolean | null;
  latitude?: number; // Opcional, para la geolocalización
  longitude?: number; // Opcional, para la geolocalización
}
