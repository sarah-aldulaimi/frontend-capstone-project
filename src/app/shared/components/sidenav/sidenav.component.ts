import { Component, OnInit } from '@angular/core';
import { AdminmenuList, menuList as staticMenuList } from '../../data/menus';

@Component({
  selector: 'll-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  navList = [];
  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('userRole') == 'Admin') {
      this.navList = AdminmenuList;
    } else {
      this.navList = staticMenuList;
    }
  }
}
