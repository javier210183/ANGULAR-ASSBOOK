import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PostCardComponent } from '../post-card/post-card.component';
import { Post } from '../interfaces/post';

@Component({
  selector: 'post-detail',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {
  @Input() post!: Post;

  #router = inject(Router);

  goBack() {
    this.#router.navigate(['/posts']);
  }
}
