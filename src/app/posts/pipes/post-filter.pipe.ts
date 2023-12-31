import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../interfaces/post';

@Pipe({
  name: 'postFilter',
  standalone: true,
})
export class PostFilterPipe implements PipeTransform {
  transform(posts: Post[], search: string): Post[] {
    if (!search) return posts;

    return posts.filter(
      (p) =>
        p.title?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        p.description?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
}
