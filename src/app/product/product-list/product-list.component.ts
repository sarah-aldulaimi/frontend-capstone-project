import { IfStmt } from '@angular/compiler';
import { Component, OnChanges, OnInit, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
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
export class ProductListComponent implements OnInit, OnChanges {
  advanceSearchExpanded: boolean = false;
  products: Products[] | undefined;
  filteredProducts: Products[] | undefined;
  categories: Category[] | undefined;
  userID: number = +localStorage.getItem('userId');
  newOrder = new Orders(this.userID);
  categorySelectForm: FormGroup;
  productPrice: number;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.categorySelectForm = this.fb.group({
      category: [null]
    });
  }

  sendTheNewValue(productID: number, event) {
    this.productService.getProduct(productID).subscribe((res: Products) => {
      this.products.forEach(element => {
        if (element.id == res.id) {
          element.price = event.target.value * res.price;
        }
      });
    });
  }

  public getAllProducts(): void {
    this.productService.getAllProducts().subscribe((res: Products[]) => {
      this.products = res;
    });
  }

  public getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe((res: Category[]) => {
      this.categories = res;
    });
  }

  public filterProducts(): void {
    var categoryAsString = JSON.stringify(this.categorySelectForm.value);
    var split1 = categoryAsString.split(':', 2);
    var split2 = split1[1].split('}', 2);
    let categoryID = Number(split2[0]);
    if (split2[0] != 'null') {
      this.productService.getFilteredProducts(categoryID).subscribe((res: Products[]) => {
        this.products = res;
      });
    } else {
      this.productService.getAllProducts().subscribe((res: Products[]) => {
        this.products = res;
      });
    }
  }

  public addProductToCart(productID: number, addForm: NgForm): void {
    if (localStorage.getItem('userId') == null) {
      alert('Please login first to place an order');
      return;
    }
    var countAsString = JSON.stringify(addForm.value);
    var split1 = countAsString.split(':', 2);
    var split2 = split1[1].split('}', 2);
    let count = Number(split2[0]);
    let tempProduct: Products;

    if (localStorage.getItem('orderID') == null) {
      this.orderService.addOrder(this.newOrder).subscribe(res => {
        localStorage.setItem('orderID', res.toString());
        this.products.forEach(element => {
          if (element.id == productID) {
            tempProduct = element;
            let orderID = localStorage.getItem('orderID');

            let prevCount = +sessionStorage.getItem(orderID + tempProduct.id.toString());
            let newCount = prevCount + count;
            sessionStorage.setItem(orderID + tempProduct.id.toString(), newCount.toString());
          }
        });
        this.orderService.getOrder(res).subscribe((res: Orders) => {
          this.orderService.addProductToOrder(res.id, tempProduct, count).subscribe(r => {
            this.orderService.viewAllProductsFromOrder(res.id).subscribe((resee: Products[]) => {});
          });
        });
      });
    } else {
      this.orderService.getOrder(Number(localStorage.getItem('orderID'))).subscribe((res: Orders) => {
        this.products.forEach(element => {
          if (element.id == productID) {
            tempProduct = element;
            let orderID = localStorage.getItem('orderID');
            let prevCount = +sessionStorage.getItem(orderID + tempProduct.id.toString());
            let newCount = prevCount + count;
            sessionStorage.setItem(orderID + tempProduct.id.toString(), newCount.toString());
          }
        });
        this.orderService.addProductToOrder(res.id, tempProduct, count).subscribe(r => {
          this.orderService.viewAllProductsFromOrder(res.id).subscribe((re: Products[]) => {});
        });
      });
    }
  }
}
