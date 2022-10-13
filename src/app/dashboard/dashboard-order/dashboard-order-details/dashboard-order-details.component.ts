import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Orders } from 'src/app/shared/data/orders';
import { Products } from 'src/app/shared/data/products';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order-details.component.html',
  styleUrls: ['./dashboard-order-details.component.scss']
})
export class DashboardOrderDetailsComponent implements OnInit {
  order: Orders | undefined;
  products: Products[] | undefined;
  orderID: number;
  private routeSub: Subscription;
  constructor(
    private orderService: OrderService,

    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.orderID = params['id']; //log the value of id
    });
    this.getOrder();
    this.getProductsForOrder();
  }

  public getOrder(): void {
    this.orderService.getOrder(this.orderID).subscribe((res: Orders) => {
      console.log(res);
      this.order = res;
    });
  }

  public getProductsForOrder(): void {
    this.orderService.viewAllProductsFromOrder(this.orderID).subscribe((res: Products[]) => {
      console.log(res);
      this.products = res;
      this.products.forEach(element => {
        element.productCount = Number(sessionStorage.getItem(element.id.toString()));
      });
      console.log(this.products);
    });
  }
}
