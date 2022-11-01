import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Role } from '../data/role';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL: string = 'http://localhost:8080/users/';
  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL);
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseURL + id).pipe(
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

  public login(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:8080/login', user).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            switch (error.status) {
              case 401: //login
                alert('Password and email do not match!');
                break;
              case 404: //user does not exist
                alert('This email does not exist!');
                break;
            }
          }
        } else {
          console.error('some thing else happened');
        }
        return throwError(error);
      })
    );
  }

  public addUser(user: User): Observable<any> {
    return this.http.post<any>(this.baseURL, user).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            switch (error.status) {
              case 400: //Invalid Input
                alert(`${error.error}`);
                break;
              case 401: //login
                alert('Password and email do not match!');
                break;
              case 404: //user does not exist
                alert('This email does not exist!');
                break;
            }
          }
        } else {
          console.error('some thing else happened');
        }
        return throwError(error);
      })
    );
  }

  public checkUserRole(id: number): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseURL + id + '/roles').pipe(
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

  public assignUserRole(id: number, role: Role): Observable<Role> {
    return this.http.post<Role>(this.baseURL + id + '/roles', role).pipe(
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
