import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/data/category';
import { Orders } from 'src/app/shared/data/orders';
import { Products } from 'src/app/shared/data/products';
import { CategoryService } from 'src/app/shared/service/category.service';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'll-dashboard-saved-item',
  templateUrl: './dashboard-saved-item.component.html',
  styleUrls: ['./dashboard-saved-item.component.scss']
})
export class DashboardSavedItemComponent implements OnInit {
  view = 'list';
  shoppingCart: Products[];
  categories: Category[];
  categoryName: String;
  constructor(private orderService: OrderService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.viewCart();
    this.getCategories();
  }

  public viewCart(): void {
    let orderID = +localStorage.getItem('orderID');
    console.log(orderID);
    this.orderService.viewAllProductsFromOrder(orderID).subscribe((res: Products[]) => {
      console.log(res);
      this.shoppingCart = res;
    });
  }

  public getCategories(): void {
    this.categoryService.getAllCategories().subscribe((res: Category[]) => {
      this.categories = res;
      console.log(res);
    });
  }

  public displayCategoryForProduct(categoryID: number): void {
    this.categories.forEach(element => {
      if ((element.id = categoryID)) this.categoryName = element.name;
    });
  }

  public addItem(item: Products): void {}

  public removeItem(item: Products): void {}

  public purchaseOrder(): void {
    this.orderService.getOrder(Number(localStorage.getItem('orderID'))).subscribe((res: Orders) => {
      res.status = 'completed';
      console.log(res.status);
      this.orderService.editOrder(Number(localStorage.getItem('orderID')), res).subscribe((respone: Orders) => {
        console.log(respone);
      });
      localStorage.removeItem('orderID');
      window.location.reload();
    });
  }
}
