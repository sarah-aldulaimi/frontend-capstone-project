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
  orderID = +localStorage.getItem('orderID');
  constructor(private orderService: OrderService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.viewCart();
    this.getCategories();
  }

  public viewCart(): void {
    this.orderService.viewAllProductsFromOrder(this.orderID).subscribe((res: Products[]) => {
      console.log(res);
      this.shoppingCart = res;
      this.shoppingCart.forEach(element => {
        element.productCount = Number(sessionStorage.getItem(element.id.toString()));
        console.log(element.productCount);
      });
    });
  }

  public getCategories(): void {
    this.categoryService.getAllCategories().subscribe((res: Category[]) => {
      this.categories = res;
    });
  }

  public displayCategoryForProduct(categoryID: number): void {
    this.categories.forEach(element => {
      if ((element.id = categoryID)) this.categoryName = element.name;
    });
  }

  public removeItem(itemID: number): void {
    this.orderService
      .deleteProductFromOrder(Number(localStorage.getItem('orderID')), itemID)
      .subscribe((res: Orders) => {
        window.location.reload();
      });
  }

  public purchaseOrder(): void {
    this.orderService.getOrder(this.orderID).subscribe((res: Orders) => {
      res.status = 'completed';
      this.orderService.editOrder(this.orderID, res).subscribe((respone: Orders) => {
        console.log(respone);
      });
      localStorage.removeItem('orderID');
      window.location.reload();
    });
  }
}
