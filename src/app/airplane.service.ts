import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAirplane } from './airplane/models/airplane.model';

@Injectable({
  providedIn: 'root'
})
export class AirplaneService {

  private urlBase = 'http://localhost:55753/api/airplane';

  constructor(private http: HttpClient) { }

  public Get(): Observable<IAirplane[]> {
    return this.http.get<IAirplane[]>(this.urlBase);
  }

  public GetById(id: number): Observable<IAirplane> {
    return this.http.get<IAirplane>(`${this.urlBase}/${id}`);
  }

  public GetByModelo(modelo: string): Observable<IAirplane[]> {
    return this.http.get<IAirplane[]>(`${this.urlBase}/modelo/${modelo}`);
  }


  public Post(airplane: IAirplane): Observable<any> {
    return this.http.post<any>(this.urlBase, airplane);
  }

  public Delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}
