import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
import { Post } from '../interfaces/post';

@Component({
  selector: 'post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
  @Output() deleted = new EventEmitter<void>();

  #postsService = inject(PostsService);
  #router = inject(Router);

  toggleLike(post: Post) {
    if (!post.likes) this.addVote(true);
    else this.deleteVote();
  }

  toggleDislike(post: Post) {
    if (post.likes || post.likes === null) this.addVote(false);
    else this.deleteVote();
  }

  addVote(likes: boolean) {
    const oldVote = this.post.likes;
    this.post.likes = likes;
    this.#postsService
      .addVote(this.post.id!, likes)
      .subscribe({ error: () => (this.post.likes = oldVote) });
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
