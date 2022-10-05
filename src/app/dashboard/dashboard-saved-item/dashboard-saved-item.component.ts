import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/shared/data/orders';
import { Products } from 'src/app/shared/data/products';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'll-dashboard-saved-item',
  templateUrl: './dashboard-saved-item.component.html',
  styleUrls: ['./dashboard-saved-item.component.scss']
})
export class DashboardSavedItemComponent implements OnInit {
  view = 'list';

  shoppingCart: Products[];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  public addItem(item: Products): void {
    this.shoppingCart.push(item);
  }

  public removeItem(item: Products): void {
    this.shoppingCart.forEach((element, index) => {
      if (element == item) {
        this.shoppingCart.splice(index);
      }
    });
  }

  public purchaseOrder(items: Orders): void {
    this.orderService.addOrder(items).subscribe((res: Orders) => {
      console.log(res);
    });
  }
}
