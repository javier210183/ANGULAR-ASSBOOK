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
