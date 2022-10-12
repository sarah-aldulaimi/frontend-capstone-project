import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';
import { User } from 'src/app/shared/data/user';
import { Role } from 'src/app/shared/data/role';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userRoles: Role[];
  isUserAdmin: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  public loginmyForm(addForm: NgForm): void {
  console.log('1');
      this.userService.login(addForm.value).subscribe((res: User)=>{
      console.log(res);
       if (res != null) {
        localStorage.setItem('userId', res.id.toString());
          }else{
            alert('Login unsuccessful!\nPlease enter the correct email/password!');
          }
        });
    console.log('2')
    this.checkLoginRole();
  }

  public LoginSuccessful(): void {
    this.router.navigate(['/dashboard']);
  }

  public checkIfUserExists(addForm: NgForm){
  this.userService.login(addForm.value).subscribe((res: User)=>{
  console.log(res);
   if (res != null) {
    localStorage.setItem('userId', res.id.toString());
      }else{
        alert('Login unsuccessful!\nPlease enter the correct email/password!');
      }
    });
  }

  public checkLoginRole(): void {
    this.userService.checkUserRole(Number(localStorage.getItem('userId'))).subscribe((res: Role[]) => {
      console.log(res);
      this.userRoles = res;
      this.userRoles.forEach(element => {
        if (element.name == localStorage.getItem('userRole')) {
          this.LoginSuccessful();
        }else{
        alert('Login unsuccessful!\nYou are attempting to sign in as a different role');
        }
      });
  }

  public checkIfUserIsAdmin(): void {
    localStorage.setItem('userRole', 'Admin');
  }
  public checkIfUserIsCustomer(): void {
    localStorage.setItem('userRole', 'Customer');
  }
}
