import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { CanComponentDeactivate } from '../../interfaces/can-component-deactivate';
import { Post } from '../interfaces/post';
import { PostRequiredDirective } from '../validators/post-required.directive';

@Component({
  selector: 'post-form',
  standalone: true,
  imports: [CommonModule, FormsModule, PostRequiredDirective],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent implements CanComponentDeactivate {
  #router = inject(Router);
  #postsService = inject(PostsService);

  newPost!: Post;
  fileName = '';
  saved = false;

  constructor() {
    this.resetNewPost();
  }

  canDeactivate() {
    return (
      this.saved ||
      confirm('Do you want to leave this page?. Changes can be lost')
    );
  }

  addPost() {
    this.newPost.mood = +this.newPost.mood;
    this.#postsService.addPost(this.newPost).subscribe(() => {
      this.saved = true;
      this.#router.navigate(['/posts']);
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
