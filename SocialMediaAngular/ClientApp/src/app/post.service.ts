import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Post } from './post/post';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>("/api/posts");
  }

  public getPost(id, subreddit): Observable<Post> {
    return this.http.get<Post>("/api/posts/" + id + "?subreddit=" + subreddit);
  }
}
