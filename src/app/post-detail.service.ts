import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './posts/interfaces/post';
import { Comment } from './posts/interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class PostDetailService {
  #postsUrl = 'posts';

  constructor(private http: HttpClient) { }

  getPostDetails(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.#postsUrl}/${postId}`);
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.#postsUrl}/${postId}/comments`);
  }

  addComment(postId: number, commentText: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.#postsUrl}/${postId}/comments`, { text: commentText });
  }
  addVote(postId: number, likes: boolean): Observable<{ totalLikes: number }> {
    // Asegúrate de que la URL y el cuerpo de la petición sean correctos.
    return this.http.post<{ totalLikes: number }>(`${this.#postsUrl}/${postId}/likes`, { likes });
  }
  deleteVote(postId: number): Observable<{ totalLikes: number }> {
    // Asegúrate de que la URL sea correcta.
    return this.http.delete<{ totalLikes: number }>(`${this.#postsUrl}/${postId}/likes`);
  }
}

