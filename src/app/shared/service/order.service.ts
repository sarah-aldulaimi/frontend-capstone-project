import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.http.get<Orders>(this.baseURL + id).pipe(
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

  public addOrder(order: Orders): Observable<any> {
    return this.http.post<any>(this.baseURL, order).pipe(
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

  public addProductToOrder(id: number, product: Products, productCount: number): Observable<any> {
    return this.http.post<any>(this.baseURL + id + '/products/' + productCount, product).pipe(
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

  public deleteProductFromOrder(id: number, productID: number, productCount: number): Observable<any> {
    return this.http.delete<any>(this.baseURL + id + '/products' + '/' + productID + '/' + productCount).pipe(
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

  public viewAllProductsFromOrder(id: number): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseURL + id + '/products').pipe(
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

  public deleteOrder(id: number): Observable<any> {
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

  public editOrder(id: number, order: Orders): Observable<any> {
    return this.http.put<any>(this.baseURL + id, order).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            alert(`${error.error}`);
          }
        } else {
          alert('An unknown error has occured');
        }
        return throwError(error);
      })
    );
  }

  public viewAllOrdersByUser(userID: number): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.baseURL + 'users/' + userID).pipe(
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
}
