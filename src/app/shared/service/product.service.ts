import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../data/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseURL: string = 'http://localhost:8080/products/';
  constructor(private http: HttpClient) {}

  public getAllProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseURL);
  }

  public getProduct(id: number): Observable<Products> {
    return this.http.get<Products>(this.baseURL + id);
  }

  public addProduct(product: Products): Observable<Products> {
    return this.http.post<Products>(this.baseURL, product);
  }

  public deleteProduct(id: number): Observable<Products> {
    return this.http.delete<Products>(this.baseURL + id);
  }

  public editProduct(id: number, product: Products): Observable<Products> {
    return this.http.put<Products>(this.baseURL + id, product);
  }

  public getFilteredProducts(categoryID: number): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseURL + 'categories/' + categoryID);
  }

  public getProductCount(products: Products[], productID: number): number {
    let countNumber: number;
    products.forEach(element => {
      if ((element.id = productID)) {
        countNumber = element.productCount;
      }
    });
    return countNumber;
  }
  public setProductCount(products: Products[], productID: number, count: number): void {
    products.forEach(element => {
      if ((element.id = productID)) {
        element.productCount = count;
      }
    });
  }
}
