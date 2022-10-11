import { Component, OnInit } from '@angular/core';
import { AdminmenuList, menuList } from '../../data/menus';

@Component({
  selector: 'll-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  navList = [];
  constructor() {}

  ngOnInit(): void {
    if (Number(localStorage.getItem('userRole')) == 1) {
      this.navList = menuList;
    } else {
      this.navList = AdminmenuList;
    }
  }
}
