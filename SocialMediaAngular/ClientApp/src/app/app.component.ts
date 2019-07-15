import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SocialMedia';

  @ViewChild('disclaimer', {read: false, static: false})
  disclaimer: ElementRef;
  
  hideDisclaimer() {
    this.disclaimer.nativeElement.classList.add('hidden');
  }
}
