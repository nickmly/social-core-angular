import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Post } from '../post/post';
import { PostService } from '../post.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {  
  @Input()
  post : Post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PostService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
  ) {}
  
  ngOnInit() {
    this.spinner.show();
    // Get post from service using id + subreddit param in route
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
          this.service.getPost(params.get('id'), params.get('subreddit'))
        )
      ).subscribe(function(data){
        this.post = data;
        this.spinner.hide();
      }.bind(this), function(error) {
        // Redirect to home page and show error
        this.router.navigate(['/']);
        this.toast.error('Post not found', 'Error', {
          timeOut: 5000,
          positionClass: 'toast-top-center'
        });
        this.spinner.hide();
      }.bind(this));
  }
}
