import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NgSelectOption } from '@angular/forms';
import { Router } from '@angular/router';
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
  products: Products[] | undefined;
  categories: Category[] | undefined;
  userID: number = +localStorage.getItem('userId');
  newOrder = new Orders(this.userID);
  categorySelectForm: FormGroup;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();

    this.categorySelectForm = this.fb.group({
      category: [null]
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
    console.log(split2[0]);
    let categoryID = Number(split2[0]);
    console.log(categoryID);
    if (split2[0] != 'null') {
      this.productService.getFilteredProducts(categoryID).subscribe((res: Products[]) => {
        this.products = res;
      });
    } else {
      this.productService.getAllProducts().subscribe((res: Products[]) => {
        console.log(res);
        this.products = res;
      });
    }
  }

  public addProductToCart(productID: number, addForm: NgForm): void {
    this.productService.getProduct(productID).subscribe((res: Products) => {
      if (addForm.value.name == '') {
        addForm.value.name = res.name;
      }
      if (addForm.value.description == '') {
        addForm.value.description = res.description;
      }
      if (addForm.value.price == '') {
        addForm.value.price = res.price;
      }
      if (addForm.value.categoryID == '') {
        addForm.value.categoryID = res.categoryID;
      }
      var countAsString = JSON.stringify(addForm.value);
      var split1 = countAsString.split(':');
      var split2 = split1[3].split('price');
      var split3 = split2[0].split(',', 2);
      let count = Number(split3[0]);
      let tempProduct: Products;
      this.products.forEach(element => {
        if (element.id == productID) {
          tempProduct = element;
          sessionStorage.setItem(tempProduct.id.toString(), count.toString());
        }
      });
      if (localStorage.getItem('orderID') == null) {
        this.orderService.addOrder(this.newOrder).subscribe((res: Orders) => {
          localStorage.setItem('orderID', res.id.toString());
          let tempID = localStorage.getItem('orderID');
          this.orderService.addProductToOrder(Number(tempID), tempProduct).subscribe((res: Orders) => {
            console.log(res);
          });
        });
      } else {
        let tempID = localStorage.getItem('orderID');
        this.orderService.addProductToOrder(Number(tempID), tempProduct).subscribe((res: Orders) => {});
      }
    });
  }

  public deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe((res: Products) => {
      window.location.reload();
    });
  }

  public editThisProduct(id: number, addForm: NgForm): void {
    this.productService.getProduct(id).subscribe((res: Products) => {
      console.log(addForm.value);
      console.log(res);
      if (addForm.value.name == '') {
        addForm.value.name = res.name;
      }
      if (addForm.value.description == '') {
        addForm.value.description = res.description;
      }
      if (addForm.value.price == '') {
        addForm.value.price = res.price;
      }
      console.log(addForm.value);
      this.productService.editProduct(id, addForm.value).subscribe((response: Products) => {});
    });
  }

  public navigateUsingButton(link: String): void {
    this.router.navigate([link]);
  }
}
