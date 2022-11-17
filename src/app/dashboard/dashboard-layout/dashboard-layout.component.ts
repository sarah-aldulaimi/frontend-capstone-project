import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminmenuList, menuList as staticMenuList } from 'src/app/shared/data/menus';
import { User } from 'src/app/shared/data/user';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'll-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  isLessThenLargeDevice;
  fName: String;
  lName: String;
  menuList = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
    this.userService.getUser(Number(localStorage.getItem('userId'))).subscribe((res: User) => {
      this.fName = res.firstName;
      this.lName = res.lastName;
    });
    if (localStorage.getItem('userRole') == 'Admin') {
      this.menuList = AdminmenuList;
      document.getElementById('adminView').style.display = 'none';
      document.getElementById('menuList').style.display = 'none';
    } else {
      this.menuList = staticMenuList;
      document.getElementById('adminView').style.display = 'inline';
      document.getElementById('menuList').style.display = 'inline';
    }
  }
  onLogout(): void {
    this.router.navigate(['auth/login']);
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  }
}
