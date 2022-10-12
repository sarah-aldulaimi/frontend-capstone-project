import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  }
  onLogout(): void {
    this.router.navigate(['auth/login']);
    localStorage.removeItem('userID');
  }
}
