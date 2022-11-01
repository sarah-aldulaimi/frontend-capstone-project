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
    let isUserLoggedIn = true;
    if (localStorage.getItem('userId') == null) {
      var slicedAdmin = AdminmenuList.slice(0, 2);
      var slicedNormal = staticMenuList.slice(0, 1);
      isUserLoggedIn = false;
      document.getElementById('loggedIn').style.visibility = 'visible';
      document.getElementById('shpLoggedIn').style.display = 'none';
    }
    if (localStorage.getItem('userRole') == 'Admin') {
      if (isUserLoggedIn) {
        this.navList = AdminmenuList;
        document.getElementById('loggedIn').style.visibility = 'hidden';
        document.getElementById('shpLoggedIn').style.display = 'inline';
      } else {
        document.getElementById('loggedIn').style.visibility = 'visible';
        document.getElementById('shpLoggedIn').style.visibility = 'none';
        this.navList = slicedAdmin;
      }
    } else {
      if (isUserLoggedIn) {
        console.log(isUserLoggedIn);
        this.navList = staticMenuList;
        document.getElementById('loggedIn').style.visibility = 'hidden';
        document.getElementById('shpLoggedIn').style.display = 'inline';
      } else {
        document.getElementById('loggedIn').style.visibility = 'visible';
        document.getElementById('shpLoggedIn').style.display = 'none';
        this.navList = slicedNormal;
      }
    }
  }
}
