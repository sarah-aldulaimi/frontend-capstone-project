import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Role } from '../data/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseURL: string = 'http://localhost:8080/roles/';
  constructor(private http: HttpClient) {}

  public addRole(role: Role): Observable<any> {
    return this.http.post<any>(this.baseURL, role).pipe(
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
  public getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseURL).pipe(
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
