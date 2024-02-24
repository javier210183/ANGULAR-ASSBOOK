import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { CanComponentDeactivate } from '../../interfaces/can-component-deactivate';
import { Post } from '../interfaces/post';
import { PostRequiredDirective } from '../validators/post-required.directive';
import { BmMapDirective } from "../../bingmaps/bm-map.directive";
import { Coordinates } from '../interfaces/Coordinates';
import { BmMarkerDirective } from "../../bingmaps/bm-marker.directive";
import { MyGeolocationService } from '../services/my-geolocation.service';
import { BmAutosuggestDirective } from "../../bingmaps/bm-autosuggest.directive";

@Component({
    selector: 'post-form',
    standalone: true,
    templateUrl: './post-form.component.html',
    styleUrl: './post-form.component.css',
    imports: [CommonModule, FormsModule, PostRequiredDirective, BmMapDirective, BmMarkerDirective, BmAutosuggestDirective]
})

export class PostFormComponent implements OnInit, CanComponentDeactivate {
  #router = inject(Router);
  #postsService = inject(PostsService);
  coordinates: Coordinates = { latitude: 38.362968278664205, longitude: -0.4409788881744305 };
  newPost!: Post;
  fileName = '';
  saved = false;
  location: GeolocationCoordinates | undefined;
  // Añadir postType con un valor inicial que refleje tu preferencia por defecto, por ejemplo, 'photo'
  postType: string = 'photo'; // 'photo' o 'location' esta variable es la central en lo que se refiere a la geolocation

  moveMap(coords: Coordinates) {
    this.coordinates = coords;
    console.log("LAS COOOOOOOOOORDENADAS  :", this.coordinates);
  }
  
  
  constructor(
    private myGeoLocationService: MyGeolocationService, // Añade esto
    // ...otros servicios inyectados
  ) {
    this.resetNewPost();
  }
  

  
   async ngOnInit() {
    await MyGeolocationService.getLocation().then(coords => {
      this.coordinates = {
        latitude: coords.latitude,
        longitude: coords.longitude
        
      };
    }).catch(error => {
      console.error('Error al obtener la geolocalización:', error);
      // Manejar el error aquí, por ejemplo, estableciendo coordenadas predeterminadas
    });
    console.log("hhhhhooooooooooooooooooollllllllllllllllaaaaaaaaaaaaaaaaaaa",this.coordinates.latitude);
  }
  canDeactivate() {
    return (
      this.saved ||
      confirm('Do you want to leave this page?. Changes can be lost')
    );
  }

  addPost() {
    // Ajustar el mood siempre
    this.newPost.mood = +this.newPost.mood;
    console.log("este es el postype", this.postType);
    if (this.postType === 'photo' && this.newPost.image) {
      // El usuario ha elegido subir una foto
      
      delete this.newPost.lat;
      delete this.newPost.lng;
    
      
    } else if (this.postType === 'location') {
      console.log("HOLA QUE ASE estoy en el elseif del addpost");
      // El usuario ha elegido compartir su ubicación
      
      this.newPost.lat = this.coordinates.latitude;
      this.newPost.lng = this.coordinates.longitude;
      this.newPost.image = ''; // O también se puede usar delete this.newPost.image;
      console.log("THIS.COORD.LOCATION   :    ",this.newPost.lng);
    }
  // Mostrar en la consola el objeto newPost que se enviará
  console.log("Enviando post:", this.newPost);
    // Envía newPost a servicio o backend
    this.#postsService.addPost(this.newPost).subscribe(() => {
      this.saved = true;
      this.#router.navigate(['/posts']);//AQUI VA :this.#router.navigate(['/posts']); SE HA CAMBIADO PARA QUE NO SE ENVIE Y PODER VER QUE SE ESTA MANDANDO AL SERVIDOR.
    });
  }
  

  resetNewPost() {
    this.newPost = {
      title: '',
      description: '',
      image: '',
      mood: 0,
      likes: null,
      totalLikes: 0, 
    };
  }

  changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) {
      this.newPost.image = '';
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newPost.image = reader.result as string;
    });
  }
}
