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
}
