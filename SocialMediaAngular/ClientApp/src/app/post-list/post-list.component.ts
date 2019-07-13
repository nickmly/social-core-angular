import { Component, OnInit } from '@angular/core';
import { Post } from '../post/post';
import { PostService } from '../post.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {  
  posts: Post[];

  constructor(private postService: PostService, private http: HttpClient) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() : void {
    this.http.get<Post[]>("/api/posts").subscribe(function(data) {
      this.posts = data[0];
    }.bind(this));
  }

}
