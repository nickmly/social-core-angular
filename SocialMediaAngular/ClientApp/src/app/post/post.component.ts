import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { Post } from './post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  
  @Input()
  post : Post;

  @Input()
  detail: boolean;

  constructor() { }

  ngOnInit() {
  }

  // Trim content down to 100 characters
  get trimmedContent() {
    if(this.post.content === '')
      return '';
    return this.post.content.substring(0, 100) + '...';
  }

  // Can show thumbnail (based on a few reddit post types)
  get canShowThumbnail() {
    return (this.post.linkType == 'default' || this.post.linkType == 'Twitch')
        && this.post.thumbnail != 'self'
        && this.post.thumbnail != 'default'
        && this.post.thumbnail != 'image'
        && this.post.thumbnail != 'nsfw';
  }
}
