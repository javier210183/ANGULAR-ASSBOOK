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
  Coordinates!: Coordinates;//CREADO PARA ENLAZAR EL HTML ,ASIGNADO RELACION CON INTERFAZ AQUI
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
  

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface 
  ngOnInit() {
    MyGeolocationService.getLocation().then(coords => {
      this.coordinates = {
        latitude: coords.latitude,
        longitude: coords.longitude
      };
    }).catch(error => {
      console.error('Error al obtener la geolocalización:', error);
      // Manejar el error aquí, por ejemplo, estableciendo coordenadas predeterminadas
    });
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
  
    if (this.postType === 'photo' && this.newPost.image) {
      // El usuario ha elegido subir una foto
      // Asegúrate de que solo se envíe la imagen, y limpia los campos de geolocalización
      delete this.newPost.latitude;
      delete this.newPost.longitude;
    } else if (this.postType === 'location') {
      // El usuario ha elegido compartir su ubicación
      // Asegúrate de enviar las coordenadas y limpiar el campo de imagen
      this.newPost.latitude = this.coordinates.latitude;
      this.newPost.longitude = this.coordinates.longitude;
      this.newPost.image = ''; // O también puedes usar delete this.newPost.image;
    }
  // Mostrar en la consola el objeto newPost que se enviará
  console.log("Enviando post:", this.newPost);
    // Envía newPost a tu servicio o backend
    this.#postsService.addPost(this.newPost).subscribe(() => {
      this.saved = true;
      this.#router.navigate(['']);//AQUI VA :this.#router.navigate(['/posts']); SE HA CAMBIADO PARA QUE NO SE ENVIE Y PODER VER QUE SE ESTA MANDANDO AL SERVIDOR.
    });
  }
  

  resetNewPost() {
    this.newPost = {
      title: '',
      description: '',
      image: '',
      mood: 0,
      likes: null,
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
