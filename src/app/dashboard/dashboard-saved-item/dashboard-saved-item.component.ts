import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/shared/data/products';

@Component({
  selector: 'll-dashboard-saved-item',
  templateUrl: './dashboard-saved-item.component.html',
  styleUrls: ['./dashboard-saved-item.component.scss']
})
export class DashboardSavedItemComponent implements OnInit {
  view = 'list';

  products: Products[] | undefined;
  constructor() {}

  ngOnInit(): void {}
}
