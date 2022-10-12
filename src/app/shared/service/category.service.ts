import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../data/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseURL: string = 'http://localhost:8080/categories';
  constructor(private http: HttpClient) {}

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseURL);
  }

  public getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.baseURL + id);
  }

  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseURL, category);
  }

  public deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(this.baseURL + id);
  }

  public editCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(this.baseURL + id, category);
  }
}
