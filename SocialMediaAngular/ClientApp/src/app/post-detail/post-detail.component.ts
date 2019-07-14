import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Post } from '../post/post';
import { PostService } from '../post.service';
import { NgxSpinnerService } from "ngx-spinner";

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
    private spinner: NgxSpinnerService
  ) {}
  
  ngOnInit() {
    this.spinner.show();
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
          this.service.getPost(params.get('id'))
        )
      ).subscribe(function(data){
        this.post = data;
        this.spinner.hide();
      }.bind(this));
  }
}
