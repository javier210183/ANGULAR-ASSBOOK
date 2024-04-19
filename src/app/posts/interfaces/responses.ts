import { Post } from "./post";
import { User } from "./user";

export interface PostsResponse {
  posts: Post[];
}

export interface SinglePostResponse {
  post: Post;
}

export interface TokenResponse {
  accessToken : string;
}
export interface UserResponse{
  user: User;
}
