import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Locations } from '../data/locations';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  baseURL: string = 'http://localhost:8080/locations';
  constructor(private http: HttpClient) {}

  public getAllLocations(): Observable<Locations[]> {
    return this.http.get<Locations[]>(this.baseURL);
  }

  public getLocation(id: number): Observable<Locations> {
    return this.http.get<Locations>('http://localhost:8080/locations/' + id);
  }

  public addLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.baseURL, location);
  }
}
