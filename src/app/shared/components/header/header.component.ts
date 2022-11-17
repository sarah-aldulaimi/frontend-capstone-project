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
    let isUserLoggedIn = true;
    if (localStorage.getItem('userId') == null) {
      var slicedAdmin = AdminmenuList.slice(0, 2);
      var slicedNormal = staticMenuList.slice(0, 1);
      isUserLoggedIn = false;
      document.getElementById('loginGroup').style.display = 'inline';
      document.getElementById('shpCart').style.display = 'none';
    }
    if (localStorage.getItem('userRole') == 'Admin') {
      if (isUserLoggedIn) {
        this.menuList = AdminmenuList;
        document.getElementById('loginGroup').style.display = 'none';
        document.getElementById('shpCart').style.display = 'none';
      } else {
        document.getElementById('loginGroup').style.display = 'inline';
        document.getElementById('shpCart').style.display = 'none';
        this.menuList = slicedAdmin;
      }
    } else {
      if (isUserLoggedIn) {
        this.menuList = staticMenuList;
        document.getElementById('loginGroup').style.display = 'none';
      } else {
        document.getElementById('loginGroup').style.display = 'inline';
        document.getElementById('shpCart').style.display = 'none';
        this.menuList = slicedNormal;
      }
    }
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isScrolled = window.pageYOffset > 15;
  }
}
