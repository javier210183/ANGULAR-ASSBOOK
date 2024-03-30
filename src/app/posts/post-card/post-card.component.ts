import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
import { Post, Publicaciones } from '../interfaces/post';

@Component({
  selector: 'post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input({ required: true }) post!: Publicaciones;
  @Output() deleted = new EventEmitter<void>();

  #postsService = inject(PostsService);
  #router = inject(Router);
  totalLikes!: number;

  toggleLike(post: Post) {
    if (!post.likes) this.addVote(true);
    else this.deleteVote();
  }

  toggleDislike(post: Post) {
    if (post.likes || post.likes === null) this.addVote(false);
    else this.deleteVote();
  }

  addVote(likes: boolean) {
    const postId = this.post.id!;
    console.log("Votando: ", likes ? "Like" : "Dislike", " en el post ID:", postId);
  
    this.#postsService.addVote(postId, likes).subscribe({
      next: (response) => {
        console.log("Respuesta del servidor al votar: ", response);
        // Asumiendo que la respuesta del servidor incluye el nuevo total de likes
        this.post.totalLikes = response.totalLikes; // Actualiza el total de likes en el modelo
        console.log("Total de likes actualizado: ", this.post.totalLikes);
      },
      error: (error) => {
        console.error("Error al votar: ", error);
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    });
  }
  

  deleteVote() {
    const oldVote = this.post.likes;
    this.post.likes = null;
    this.#postsService
      .deleteVote(this.post.id!)
      .subscribe({ error: () => (this.post.likes = oldVote) });
  }

  delete() {
    this.#postsService
      .deletePost(this.post.id!)
      .subscribe(() => this.deleted.emit());
  }

  goDetails() {
    this.#router.navigate(['/posts', this.post.id]);
  }
}