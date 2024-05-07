import { User } from "./User";
import { Discussion } from "./DiscussionType";

export interface Reply {
    reply_id: number;
    content: string;
    reply_date: string; 
    discussion: Discussion;
    author: User;
    author_object_id: number;
    author_content_type: number;
  }