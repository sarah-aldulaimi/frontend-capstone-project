import { Component } from '@angular/core';
import { Locations, locations } from './shared/data/locations';
import { Role, roles } from './shared/data/role';
import { LocationService } from './shared/service/location.service';
import { RoleService } from './shared/service/role.service';

@Component({
  //change it to application name
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lieblings';
  constructor(private roleService: RoleService, private locationService: LocationService) {}
  ngOnInit(): void {
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
}
