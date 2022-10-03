import { Component, Input, OnInit } from '@angular/core';
import { Orders } from 'src/app/shared/data/orders';
import { Products } from 'src/app/shared/data/products';
import { OrderService } from 'src/app/shared/service/order.service';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order-details.component.html',
  styleUrls: ['./dashboard-order-details.component.scss']
})
export class DashboardOrderDetailsComponent implements OnInit {
  order: Orders | undefined;
  products: Products[] | undefined;
  @Input() orderID: number;
  constructor(private orderService: OrderService, private productService: ProductService) {}

  ngOnInit(): void {
    this.getOrder();
  }

  public getOrder(): void {
    this.orderService.getOrder(1).subscribe((res: Orders) => {
      console.log(res);
      this.order = res;
    });
  }

  public getProductsForOrder(): void {}
}
