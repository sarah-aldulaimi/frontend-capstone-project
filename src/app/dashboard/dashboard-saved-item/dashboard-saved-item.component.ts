import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/data/category';
import { Orders } from 'src/app/shared/data/orders';
import { Products } from 'src/app/shared/data/products';
import { CategoryService } from 'src/app/shared/service/category.service';
import { OrderService } from 'src/app/shared/service/order.service';
import { ProductService } from 'src/app/shared/service/product.service';

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
  order = new Orders(Number(localStorage.getItem('userId')));
  orderID = +localStorage.getItem('orderID');
  constructor(
    private orderService: OrderService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.viewCart();
    this.viewOrder();
    this.getCategories();
  }

  public viewCart(): void {
    if (localStorage.getItem('orderID') == null) {
      return;
    }
    this.orderService.viewAllProductsFromOrder(this.orderID).subscribe((res: Products[]) => {
      this.shoppingCart = [...new Map(res.map(item => [item.id, item])).values()];
      console.log(this.shoppingCart);
      this.shoppingCart.forEach(element => {
        element.productCount = Number(sessionStorage.getItem(this.orderID + element.id.toString()));
        element.price = element.productCount * element.price;
      });
    });
  }

  public viewOrder(): void {
    if (localStorage.getItem('orderID') == null) {
      document.getElementById('fullShoppingCart').style.display = 'none';
      document.getElementById('emptyShoppingCart').style.display = 'inline';
      return;
    } else {
      this.orderService.getOrder(this.orderID).subscribe((res: Orders) => {
        this.order = res;
        console.log(this.order);
        document.getElementById('fullShoppingCart').style.display = 'inline';
        document.getElementById('emptyShoppingCart').style.display = 'none';
      });
    }
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
    this.shoppingCart.forEach(element => {
      if (element.id == itemID) {
        var count = element.productCount;
      }
      this.orderService
        .deleteProductFromOrder(Number(localStorage.getItem('orderID')), itemID, count)
        .subscribe((res: Orders) => {
          window.location.reload();
        });
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
