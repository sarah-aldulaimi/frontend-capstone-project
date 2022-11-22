import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  public addProduct(product: Products): Observable<any> {
    return this.http.post<any>(this.baseURL, product).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            alert(`${error.error}`);
          }
        } else {
          console.error('some thing else happened');
        }
        return throwError(error);
      })
    );
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(this.baseURL + id).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            alert(`${error.error}`);
          }
        } else {
          console.error('some thing else happened');
        }
        return throwError(error);
      })
    );
  }

  public editProduct(id: number, product: Products): Observable<any> {
    return this.http.put<any>(this.baseURL + id, product).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            alert(`${error.error}`);
          }
        } else {
          console.error('some thing else happened');
        }
        return throwError(error);
      })
    );
  }

  public getFilteredProducts(categoryID: number): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseURL + 'categories/' + categoryID);
  }
}
