import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../data/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseURL: string = 'http://localhost:8080/products';
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
}
