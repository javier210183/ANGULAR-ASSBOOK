import { Observable, map } from "rxjs";
import { PostsResponse, SinglePostResponse } from "../interfaces/responses";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Post } from "../interfaces/post";

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  #postsUrl = 'posts';
  #http = inject(HttpClient);
  

  getPosts(): Observable<Post[]> {
    return this.#http
      .get<PostsResponse>(this.#postsUrl)
      .pipe(map((resp) => resp.posts));
  }

  getPost(id: number): Observable<Post> {
    return this.#http
      .get<SinglePostResponse>(`${this.#postsUrl}/${id}`)
      .pipe(map((resp) => resp.post));
  }

  addPost(post: Post): Observable<Post> {
    return this.#http
      .post<SinglePostResponse>(this.#postsUrl, post)
      .pipe(map((resp) => resp.post));
  }

  deletePost(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#postsUrl}/${id}`);
  }

  
addVote(postId: number, likes: boolean): Observable<{ totalLikes: number }> {
  return this.#http.post<{ totalLikes: number }>(`${this.#postsUrl}/${postId}/likes`, { likes });
}



  deleteVote(id: number) {
    return this.#http.delete<void>(`${this.#postsUrl}/${id}/likes`);
  }
  getComments(id:number){
    return this.#http
      .get<SinglePostResponse>(`${this.#postsUrl}/${id}/comments`);
       
  }
}