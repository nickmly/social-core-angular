import { Component, OnInit, Input } from '@angular/core';
import { Post } from './post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  
  @Input()
  post : Post;

  constructor() { }

  ngOnInit() {
  }

  get trimmedContent() {
    if(this.post.content === '')
      return '';
    return this.post.content.substring(0, 100) + '...';
  }  

  get linkToPost() {
    return "/api/posts/" + this.post.id;
  }

  get canShowThumbnail() {
    return this.post.linkType == 'default' && this.post.thumbnail != 'self' && this.post.thumbnail != 'default' && this.post.thumbnail != 'image';
  }
}
