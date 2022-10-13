import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/data/user';
import { locations, Locations } from 'src/app/shared/data/locations';
import { LocationService } from 'src/app/shared/service/location.service';
import { UserService } from 'src/app/shared/service/user.service';
import { Role, roles } from 'src/app/shared/data/role';
import { RoleService } from 'src/app/shared/service/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'll-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public locations: Locations[] | undefined;
  newUser: User;
  constructor(
    private userService: UserService,
    private locationService: LocationService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLocations();
    this.roleService.addRole(roles[0]).subscribe((res: Role) => {});
    this.roleService.addRole(roles[1]).subscribe((res: Role) => {});

    for (let index = 0; index < locations.length; index++) {
      this.locationService.addLocation(locations[index]).subscribe((res: Locations) => {});
    }
  }
  public registerUser(addForm: NgForm): void {
    this.userService.addUser(addForm.value).subscribe((res: User) => {
      localStorage.setItem('userId', res.id.toString());
      this.userService.assignUserRole(res.id, roles[1]).subscribe((response: Role) => {
        console.log(response);
        this.router.navigate(['/dashboard']);
      });
    });
  }

  public getLocations(): void {
    this.locationService.getAllLocations().subscribe((res: Locations[]) => {
      this.locations = res;
      console.log(this.locations);
    });
  }
}
