import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';
import { User } from 'src/app/shared/data/user';
import { Role, roles } from 'src/app/shared/data/role';
import { Locations, locations } from 'src/app/shared/data/locations';
import { RoleService } from 'src/app/shared/service/role.service';
import { LocationService } from 'src/app/shared/service/location.service';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userRoles: Role[];
  isUserAdmin: boolean = false;
  adminUser = new User();
  userID: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private roleService: RoleService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    // this.setUp();
    this.createAdminUser();
  }

  public setUp(): void {
    this.roleService.getAllRoles().subscribe((res: Role[]) => {
      if (res.length == 0) {
        this.roleService.addRole(roles[0]).subscribe(res => {
          this.roleService.addRole(roles[1]).subscribe(res => {});
        });
      }
      this.locationService.getAllLocations().subscribe((res: Locations[]) => {
        if (res.length == 0) {
          locations.forEach(element => {
            this.locationService.addLocation(element).subscribe(res => {});
          });
        }
      });
    });
  }

  public createAdminUser(): void {
    this.userService.getAllUsers().subscribe((res: User[]) => {
      if (res.length == 0) {
        this.userService.addUser(this.adminUser).subscribe(re => {
          this.userService.assignUserRole(re, roles[0]).subscribe(res => {});
        });
      }
    });
  }

  public loginmyForm(addForm: NgForm): void {
    this.userService.login(addForm.value).subscribe(res => {
      this.userID = res?.toString() || '';
      console.log(this.userID);
      localStorage.setItem('userId', this.userID);
      this.checkLoginRole();
    });
  }

  public LoginSuccessful(): void {
    this.router.navigate(['/dashboard']);
  }

  public checkLoginRole(): void {
    this.userService.checkUserRole(Number(localStorage.getItem('userId'))).subscribe((res: Role[]) => {
      this.userRoles = res;
      this.userRoles.forEach(element => {
        if (element.name == localStorage.getItem('userRole')) {
          this.LoginSuccessful();
        } else {
          alert('Login unsuccessful!\nYou are attempting to sign in as a different role');
        }
      });
    });
  }

  public checkIfUserIsAdmin(): void {
    localStorage.setItem('userRole', 'Admin');
  }
  public checkIfUserIsCustomer(): void {
    localStorage.setItem('userRole', 'Customer');
  }
}
