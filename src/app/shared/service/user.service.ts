import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get<User>(this.baseURL + id);
  }

  public login(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>('http://localhost:8080/login', user);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseURL, user);
  }

  public checkUserRole(id: number): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseURL + id + '/roles');
  }

  public assignUserRole(id: number, role: Role): Observable<Role> {
    return this.http.post<Role>(this.baseURL + id + '/roles', role);
  }
}
