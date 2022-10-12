import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../data/role';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseURL: string = 'http://localhost:8080/roles/';
  constructor(private http: HttpClient) {}

  public addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.baseURL, role);
  }
}
