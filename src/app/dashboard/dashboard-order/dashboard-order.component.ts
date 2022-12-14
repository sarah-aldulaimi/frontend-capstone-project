import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orders } from 'src/app/shared/data/orders';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.scss']
})
export class DashboardOrderComponent implements OnInit {
  orders: Orders[] | undefined;
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.getOrders();
  }

  public getOrders(): void {
    this.orderService.viewAllOrdersByUser(Number(localStorage.getItem('userId'))).subscribe((res: Orders[]) => {
      console.log(res);
      this.orders = res;
      console.log(this.orders);
      if (this.orders.length == 0) {
        document.getElementById('emptyOrders').style.display = 'inline';
        document.getElementById('fullOrders').style.display = 'none';
      } else {
        document.getElementById('emptyOrders').style.display = 'none';
        document.getElementById('fullOrders').style.display = 'inline';
      }
    });
  }

  public deleteOrder(orderID: number): void {
    this.orderService.deleteOrder(orderID).subscribe((res: String) => {
      this.ngOnInit();
    });
  }
}
