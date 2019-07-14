import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Post } from './post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  
  @Input()
  post : Post;

  safeLink : SafeResourceUrl;

  constructor(private sanitizer : DomSanitizer) { }

  ngOnInit() {
    this.safeLink = this.sanitizer.sanitize(SecurityContext.URL, this.post.link);
  }

  get trimmedContent() {
    if(this.post.content === '')
      return '';
    return this.post.content.substring(0, 100) + '...';
  }

  get canShowThumbnail() {
    return this.post.linkType == 'default'
        && this.post.thumbnail != 'self'
        && this.post.thumbnail != 'default'
        && this.post.thumbnail != 'image'
        && this.post.thumbnail != 'nsfw';
  }
}
