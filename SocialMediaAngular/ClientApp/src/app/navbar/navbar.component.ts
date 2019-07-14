import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('navLinks', {read: false, static: false})
  navLinks: ElementRef;

  @ViewChild('navBurger', {read: false, static: false})
  navBurger: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // If window is smaller than breakpoint width, remove navLinks and add navBurger
    if(event.target.innerWidth <= 1000) {
      this.navBurger.nativeElement.classList.remove('hidden');
      this.navLinks.nativeElement.classList.add('hidden');
    }
    else {
      // Else add nav links with no burger
      this.navBurger.nativeElement.classList.add('hidden');
      this.navLinks.nativeElement.classList.remove('hidden');
    }
  }

  toggleNavbar() {
    this.navLinks.nativeElement.classList.toggle('hidden');
  }

  onClickNavLink() {
    this.navLinks.nativeElement.classList.add('hidden');
  }
}
