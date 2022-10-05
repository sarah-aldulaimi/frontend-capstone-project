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
  productCount: number;
  @Input() orderID: number;
  constructor(private orderService: OrderService, private productService: ProductService) {}

  ngOnInit(): void {
    this.getOrder();
    this.getProductsForOrder();
  }

  public getOrder(): void {
    this.orderService.getOrder(1).subscribe((res: Orders) => {
      console.log(res);
      this.order = res;
    });
  }

  public getProductsForOrder(): void {
    this.orderService.viewAllProductsFromOrder(1).subscribe((res: Products[]) => {
      console.log(res);
      this.products = res;
      this.products.forEach(element => {
        console.log(this.getProductCount(element));
      });
    });
  }

  public getProductCount(product: Products): number {
    let temp = 0;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i] == product) {
        console.log(temp);
        temp++;
      }
    }
    return temp;
  }
}
