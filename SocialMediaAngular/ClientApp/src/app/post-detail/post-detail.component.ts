import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Post } from '../post/post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.sass']
})
export class PostDetailComponent implements OnInit {  
  @Input()
  post : Post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PostService
  ) {}
  
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
          this.service.getPost(params.get('id'))
        )
      ).subscribe(function(data){
        this.post = data;
      }.bind(this));
  }
}
