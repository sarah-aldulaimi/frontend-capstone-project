import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/data/category';
import { Orders } from 'src/app/shared/data/orders';
import { CategoryService } from 'src/app/shared/service/category.service';
import { OrderService } from 'src/app/shared/service/order.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { Products } from '../../shared/data/products';

@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  products: Products[] | undefined;
  filteredProducts: Products[] | undefined;
  categories: Category[] | undefined;
  userID: number = +localStorage.getItem('userId');
  newOrder = new Orders(this.userID);

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  public getAllProducts(): void {
    this.productService.getAllProducts().subscribe((res: Products[]) => {
      console.log(res);
      this.products = res;
    });
  }

  public getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe((res: Category[]) => {
      console.log(res);
      this.categories = res;
    });
  }

  public filterProducts(categoryID: number): void {
    for (var product of this.products) {
      if (product.categoryID == categoryID) {
        this.filteredProducts.push(product);
      }
    }
  }

  public addProductToCart(productID: number): void {
    if (localStorage.getItem('orderID') == null) {
      this.createOrder();
    } else {
      let orderID = +localStorage.getItem('orderID');
      let tempProduct: Products;
      this.products.forEach(element => {
        if ((element.id = productID)) {
          tempProduct = element;
        }
      });
      this.orderService.addProductToOrder(orderID, tempProduct).subscribe();
    }
  }

  public createOrder(): void {
    this.orderService.addOrder(this.newOrder).subscribe((res: Orders) => {
      localStorage.setItem('orderID', res.id.toString());
    });
  }
}
