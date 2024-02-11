import { Post } from "./post";
import { UserLogin } from "./user";

export interface CommentInsert {
    text: string;
}

export interface Comment extends CommentInsert {
    id: number;
    text: string;
    date: string;
    post?: Post;
    user: UserLogin;
}