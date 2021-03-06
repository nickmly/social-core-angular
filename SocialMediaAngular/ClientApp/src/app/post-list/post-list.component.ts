import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";


import { Post } from '../post/post';
import { PostService } from '../post.service';
import { ActivatedRoute, Router, ParamMap, NavigationEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';


import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


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
    private router: Router) {
    router.events.subscribe((val) => {
      // When we finish navigating to this route, show spinner
      if(val instanceof NavigationEnd) {
        this.spinner.show();
      }  
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.getPosts();
  }

  getPosts(): void {
    // Get posts from service using subreddit param in route
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.postService.getPosts(params.get('subreddit'))
      )
    ).subscribe(function (data) {
      this.posts = data;
      if (this.posts.length === 0) {
        this.showError('Nothing to show here! Redirecting...');
      }
      this.spinner.hide();
    }.bind(this), function (error) {
      this.showError('Page not found. Redirecting...');
      this.spinner.hide();
    }.bind(this));
  }

  showError(message) {
    // Redirect to home page and show error
    this.router.navigate(['/']);
    this.toast.error(message, 'Error', {
      timeOut: 5000,
      positionClass: 'toast-top-center'
    }).onHidden.subscribe(function () {
      // After five seconds, refresh home page (trick to prevent angular from loading this same component again)
      location.reload();
    });
  }
}
