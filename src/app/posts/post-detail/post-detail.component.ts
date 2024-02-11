import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostCardComponent } from '../post-card/post-card.component';
import { Post } from '../interfaces/post';
import { PostDetailService } from '../../post-detail.service';
import { Comment} from '../interfaces/comment';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'post-detail',
  standalone: true,
  imports: [CommonModule, PostCardComponent,FormsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit{
  @Input() post!: Post;

  #router = inject(Router);

  goBack() {
    this.#router.navigate(['/posts']);
  }
  
  comments: Comment[] = [];
  newCommentText: string = '';

  constructor(
    private route: ActivatedRoute,
    private postDetailService: PostDetailService,
    private router: Router // Aquí lo inyectas a través del constructor
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const postId = +params['id']; // el signo + convierte la cadena en número
      if (postId) {
        this.loadPost(postId);
        this.loadComments(postId);
      }
    });
  }

  loadPost(postId: number): void {
    this.postDetailService.getPostDetails(postId).subscribe(post => {
      this.post = post;
    });
  }

  loadComments(postId: number): void {
    this.postDetailService.getComments(postId).subscribe(comments => {
      this.comments = comments;
    });
  }

  addComment(): void {
    if (this.newCommentText.trim()) {
      this.postDetailService.addComment(this.post.id!, this.newCommentText)
        .subscribe(comment => {
          this.comments.push(comment);
          this.newCommentText = ''; // Limpiar el input después de enviar
        });
    }
  }
  
}
