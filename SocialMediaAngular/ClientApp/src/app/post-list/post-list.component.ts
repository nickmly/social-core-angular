import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";


import { Post } from '../post/post';
import { PostService } from '../post.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


import { ToastrService } from 'ngx-toastr';


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
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.getPosts();
  }

  getPosts() : void {
    // Get posts from service using subreddit param in route
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
          this.postService.getPosts(params.get('subreddit'))
        )
      ).subscribe(function(data){
        this.posts = data;
        this.spinner.hide();
      }.bind(this), function(error){
        // Redirect to home page and show error
        this.router.navigate(['/']);
          this.toast.error('Page not found. Redirecting...', 'Error', {
          timeOut: 5000,
          positionClass: 'toast-top-center'
        });
        // After five seconds, refresh home page (trick to prevent angular from loading this same component again)
        setTimeout(function() {    
          location.reload();
        }.bind(this), 5000);
        this.spinner.hide();
      }.bind(this));
  }
}
