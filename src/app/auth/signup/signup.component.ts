import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/data/user';
import { Locations } from 'src/app/shared/data/locations';
import { LocationService } from 'src/app/shared/service/location.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'll-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public locations: Locations[] | undefined;
  constructor(private userService: UserService, private locationService: LocationService) {}

  ngOnInit(): void {
    this.getLocations();
  }
  public registerUser(addForm: NgForm): void {
    this.userService.addUser(addForm.value).subscribe((res: User) => {
      console.log(res);
    });
  }

  public getLocations(): void {
    this.locationService.getAllLocations().subscribe((res: Locations[]) => {
      this.locations = res;
      console.log(this.locations);
    });
  }
}
