import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";


import { Post } from '../post/post';
import { PostService } from '../post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {  
  posts: Post[];

  constructor(private postService: PostService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.getPosts();
  }

  getPosts() : void {
    this.postService.getPosts().subscribe(function(posts){
      this.posts = posts;
      this.spinner.hide();
    }.bind(this));
  }

}
