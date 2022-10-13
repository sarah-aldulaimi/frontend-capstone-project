import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../data/orders';
import { Products } from '../data/products';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseURL: string = 'http://localhost:8080/orders/';
  constructor(private http: HttpClient) {}

  public getAllOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.baseURL);
  }

  public getOrder(id: number): Observable<Orders> {
    return this.http.get<Orders>(this.baseURL + id);
  }

  public addOrder(order: Orders): Observable<Orders> {
    return this.http.post<Orders>(this.baseURL, order);
  }

  public addProductToOrder(id: number, product: Products): Observable<Products[]> {
    return this.http.post<Products[]>(this.baseURL + id + '/products', product);
  }

  public deleteProductFromOrder(id: number, productID: number): Observable<Orders> {
    return this.http.delete<Orders>(this.baseURL + id + '/products' + '/' + productID);
  }

  public viewAllProductsFromOrder(id: number): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseURL + id + '/products');
  }

  public deleteOrder(id: number): Observable<String> {
    return this.http.delete<String>(this.baseURL + id);
  }

  public editOrder(id: number, order: Orders): Observable<Orders> {
    return this.http.put<Orders>(this.baseURL + id, order);
  }
}
