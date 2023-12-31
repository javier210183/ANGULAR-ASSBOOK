import { Routes } from "@angular/router";
import { leavePageGuard } from "../guards/leave-page.guard";
import { numericIdGuard } from "../guards/numeric-id.guard";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostFormComponent } from "./post-form/post-form.component";
import { PostsPageComponent } from "./posts-page/posts-page.component";
import { postResolver } from "./resolvers/post.resolver";

export const postsRoutes: Routes = [
  {
    path: '',
    component: PostsPageComponent,
  },
  {
    path: 'add',
    canDeactivate: [leavePageGuard],
    component: PostFormComponent,
  },
  {
    path: ':id',
    canActivate: [numericIdGuard],
    resolve: {
      post: postResolver
    },
    component: PostDetailComponent,
  }
];
