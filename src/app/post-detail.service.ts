import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './posts/interfaces/post';
import { Comment } from './posts/interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class PostDetailService {

  constructor(private http: HttpClient) { }

  getPostDetails(postId: number): Observable<Post> {
    return this.http.get<Post>(`/api/posts/${postId}`);
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`/api/posts/${postId}/comments`);
  }

  addComment(postId: number, commentText: string): Observable<Comment> {
    return this.http.post<Comment>(`/api/posts/${postId}/comments`, { text: commentText });
  }
}

