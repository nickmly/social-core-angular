import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";


import { Post } from '../post/post';
import { PostService } from '../post.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {  
  posts: Post[];

  constructor(
    private postService: PostService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.getPosts();
  }

  getPosts() : void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
          this.postService.getPosts(params.get('subreddit'))
        )
      ).subscribe(function(data){
        this.posts = data;
        this.spinner.hide();
      }.bind(this), function(error){
        console.error(error);
        this.spinner.hide();
      }.bind(this));
  }
}
