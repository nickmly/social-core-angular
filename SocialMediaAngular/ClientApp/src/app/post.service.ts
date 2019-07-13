import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './post/post';
import { POSTS } from './mock-posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  public getPosts(): Observable<Post[]> {
    return of(POSTS);
  }
}
