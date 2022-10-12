import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';
import { User } from 'src/app/shared/data/user';
import { Role, roles } from 'src/app/shared/data/role';
import { RoleService } from 'src/app/shared/service/role.service';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userRoles: Role[];
  isUserAdmin: boolean = false;

  constructor(private userService: UserService, private router: Router, private roleService: RoleService) {}

  ngOnInit(): void {
    this.roleService.addRole(roles[0]).subscribe((res: Role) => {});
    this.roleService.addRole(roles[1]).subscribe((res: Role) => {});
  }

  public loginmyForm(addForm: NgForm): void {
    this.userService.login(addForm.value).subscribe((res: User) => {
      if (res != null) {
        localStorage.setItem('userId', res.id.toString());
        this.checkLoginRole();
      } else {
        alert('Login unsuccessful!\nPlease enter the correct email/password!');
      }
    });
  }

  public LoginSuccessful(): void {
    this.router.navigate(['/dashboard']);
  }

  public checkLoginRole(): void {
    this.userService.checkUserRole(Number(localStorage.getItem('userId'))).subscribe((res: Role[]) => {
      console.log(res);
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
