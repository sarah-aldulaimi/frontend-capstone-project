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

  public addProductToOrder(id: number, product: Products): Observable<Orders> {
    return this.http.post<Orders>(this.baseURL + id + '/products', product);
  }

  public viewAllProductsFromOrder(id: number): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseURL + id + '/products');
  }
}
