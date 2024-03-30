import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostCardComponent } from '../post-card/post-card.component';
import { Post } from '../interfaces/post';
import { PostDetailService } from '../../post-detail.service';
import { Comment} from '../interfaces/comment';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserLogin } from '../interfaces/user';
@Component({
  selector: 'post-detail',
  standalone: true,
  imports: [CommonModule, PostCardComponent,FormsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit{
  @Input() post!: Post;
  userProfile!: UserLogin;
  #router = inject(Router);
  avatarUrl: any;
  name: any;
  email: any;
  


  goBack() {
    this.#router.navigate(['/posts']);
  }
  
  comments: Comment[] = [];
  newCommentText: string = '';

  constructor(
    private route: ActivatedRoute,
    private postDetailService: PostDetailService,
    private router: Router, // Aquí lo inyecto a través del constructor
    private authService: AuthService, // Inyecta AuthService si lo necesitas
    
  ) {}
  loadUserProfile(): void {
    this.authService.getProfile().subscribe({
      next: (response: any) => { // Cambio aquí para aceptar cualquier tipo
        console.log("Respuesta completa de profile:", response);
        this.userProfile = response.user; // Accede a través de la propiedad 'user'
        this.name = response.user.name; // Ahora sí, accedemos a 'name'
        this.email = response.user.email; // Y aquí accedemos a 'email'
        this.avatarUrl = response.user.avatar;
        console.log("TU NOMBRE : ", this.name);
        console.log("TU EMAIL : ", this.email);
        console.log("URL del avatar:", this.avatarUrl);
        console.log("ESTE ES TU USUARIOOOOOO   : ",response.user);
      },
      error: (error) => console.error('Error obtaining user profile:', error),
    });
  }
  
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      const postId = +params['id']; // el signo + convierte la cadena en número
      if (postId) {
       // this.loadPost(postId);
        this.loadComments(postId);
        console.log("ESTE ES EL POST QUE HEMOS SELECCIONADO EN DETALLE ",this.post);
      }
    });
  }
  
/*
  loadPost(postId: number): void {
    this.postDetailService.getPostDetails(postId).subscribe(post => {
      this.post = post;
      console.log("EL POOOOST  : DE LOADPOST : ",post);
    });
  }
*/
  loadComments(postId: number): void {
    this.postDetailService.getComments(postId).subscribe({
      next: (comments) => {
        console.log(" HE  PEDIDO los comments Y ME DEVUELVE :", comments);
        // Actualizar la UI con el nuevo avatar
        this.comments = comments;
      },
      error: (error) => console.error(' ERROR R R R Rgetting comments', error)
    });
  }

  addComment(): void {
    if (this.newCommentText.trim()) {
      this.postDetailService.addComment(this.post.id!, this.newCommentText)
        .subscribe({
          next: (comment) => {
            console.log(" HE  añadido un comentario y me d Y ME DEVUELVE :", comment);
            // Actualizar la UI con el nuevo avatar
            this.comments.push(comment);
          },
          error: (error) => console.error(' ERROR R R R Rgetting comments', error)
        });
    }
  }
  addVote(likes: boolean): void {
    const oldVote = this.post.likes;
    const oldLikesCount = this.post.totalLikes;

    // Llamar al servicio para añadir un voto
    this.postDetailService.addVote(this.post.id!, likes).subscribe({
      next: (response) => {
        this.post.totalLikes = response.totalLikes;
        this.post.likes = likes; // Actualiza el estado del 'like'
      },
      error: () => {
        this.post.likes = oldVote; // Revertir si hay error
        this.post.totalLikes = oldLikesCount; // Revertir si hay error
      }
    });
  }

  deleteVote(): void {
    const oldVote = this.post.likes;
    const oldLikesCount = this.post.totalLikes;

    // Llamar al servicio para borrar un voto
    this.postDetailService.deleteVote(this.post.id!).subscribe({
      next: (response) => {
        this.post.totalLikes = response.totalLikes;
        this.post.likes = null; // Actualiza el estado del 'like'
      },
      error: () => {
        this.post.likes = oldVote; // Revertir si hay error
        this.post.totalLikes = oldLikesCount; // Revertir si hay error
      }
    });
  }

  toggleLike(): void {
    if (this.post.likes === true) {
      this.deleteVote();
    } else {
      this.addVote(true);
    }
  }

  toggleDislike(): void {
    if (this.post.likes === false) {
      this.deleteVote();
    } else {
      this.addVote(false);
    }
  }
  
}
