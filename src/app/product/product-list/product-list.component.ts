import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/data/category';
import { CategoryService } from 'src/app/shared/service/category.service';
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
  constructor(private productService: ProductService, private categoryService: CategoryService) {}

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

  public addProduct(): void {}
}
