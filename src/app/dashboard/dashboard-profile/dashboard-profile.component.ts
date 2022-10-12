import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Locations } from 'src/app/shared/data/locations';
import { User } from 'src/app/shared/data/user';
import { LocationService } from 'src/app/shared/service/location.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'll-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.scss']
})
export class DashboardProfileComponent implements OnInit {
  userInfo: User;
  id: number;
  location: Locations;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
    });
    this.getUser();
  }

  public getUser(): void {
    this.userService.getUser(Number(localStorage.getItem('userId'))).subscribe((res: User) => {
      console.log(res);
      this.userInfo = res;
      this.setLocation(this.userInfo.locationId);
    });
  }

  public setLocation(locationID: number): void {
    this.locationService.getLocation(locationID).subscribe((res: Locations) => {
      console.log(res);
      this.location = res;
    });
  }
}
