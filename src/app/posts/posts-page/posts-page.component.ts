import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostFormComponent } from '../post-form/post-form.component';
import { PostFilterPipe } from '../pipes/post-filter.pipe';
import { PostsService } from '../services/posts.service';
import { Post } from '../interfaces/post';

@Component({
  selector: 'posts-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PostCardComponent, PostFormComponent, PostFilterPipe],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.css'
})
export class PostsPageComponent implements OnInit {
  #postsService = inject(PostsService);
  posts: Post[] = [];
  search = '';

  ngOnInit(): void {
    this.#postsService.getPosts().subscribe(posts => this.posts = posts);
  }

  addPost(post: Post) {
    this.posts = [...this.posts, post];
  }

  deletePost(post: Post) {
    this.posts = this.posts.filter(p => p.id !== post.id);
  }
}
