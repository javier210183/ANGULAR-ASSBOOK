import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { Post } from '../interfaces/post';

export const postResolver: ResolveFn<Post> = (route) => {
  return inject(PostsService).getPost(+route.params['id']).pipe(
    catchError(() => {
      inject(Router).navigate(['/posts']);
      return EMPTY;
    })
  );
};
