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

  @Input()
  detail: boolean;

  constructor() { }

  ngOnInit() { }

  onImageLoad(event) {
    // On image load, check if the image is larger than 800px (breakpoint width)
    // If so, force it to fit the div
    if(event.target.clientWidth >= 800) {
      event.target.classList.add('post-image-full');
    }
  }

  get trimmedContent() {
    if(this.post.content === '')
      return '';
    // If we are viewing the details of a specific post, show entire content
    if(this.detail)
      return this.post.content;
    // Trim content down to 100 characters
    return this.post.content.substring(0, 100) + '...';
  }

  get canShowContent() {
    return this.post.nsfw == false || this.detail == true;
  }

  // Can show thumbnail (based on a few reddit post types)
  get canShowThumbnail() {
    return (this.post.linkType == 'default' || this.post.linkType == 'Twitch')
        && this.post.nsfw == false
        && this.post.thumbnail != 'self'
        && this.post.thumbnail != 'default'
        && this.post.thumbnail != 'image'
        && this.post.thumbnail != 'nsfw'
        && this.post.thumbnail != 'spoiler';
  }
}
