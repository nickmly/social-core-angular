import { Comment } from '../comment/comment';

export class Post {
  id: string;
  title: string = "<title>";
  content: string = "<body>";
  authorName: string = "<author>";
  subreddit: string;
  link: string;
  permalink: string;
  likes: number = 0;
  linkType: string;
  thumbnail: string;
  comments: Comment[];
}
