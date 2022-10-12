import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AdminmenuList, menuList as staticMenuList } from '../../data/menus';

@Component({
  selector: 'll-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() topFixed: boolean;
  @Output() toggleSidenav = new EventEmitter();
  isScrolled: boolean;
  menuList = [];
  isLessThenLargeDevice;
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    if (localStorage.getItem('userRole') == 'Admin') {
      this.menuList = AdminmenuList;
    } else {
      this.menuList = staticMenuList;
    }
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
    if (localStorage.getItem('userId') != null) {
      const loginbtn = document.getElementById('loginbtn');
      loginbtn.innerHTML = 'Logout';
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isScrolled = window.pageYOffset > 15;
  }
}
