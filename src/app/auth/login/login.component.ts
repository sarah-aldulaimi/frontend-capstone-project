import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/shared/service/user.service';
import { User } from 'src/app/shared/data/user';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  public loginmyForm(addForm: NgForm): void {
    this.userService.login(addForm.value).subscribe((res: User) => {
      console.log(res);
      localStorage.setItem('userId', res.id.toString());
      if (res != null) {
        this.LoginSuccessful();
      } else {
        alert('Login unsuccessful!\nPlease enter the correct email/password!');
      }
    });
  }

  public LoginSuccessful(): void {
    this.router.navigate(['/dashboard']);
  }
}
