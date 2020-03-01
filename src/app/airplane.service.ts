import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAirplane } from './airplane/models/airplane.model';
import { AirplaneDTO } from './airplane/models/airplaneDTO.model';

@Injectable({
  providedIn: 'root'
})
export class AirplaneService {

  private urlBase = 'http://localhost:55753/api/airplane';

  constructor(private http: HttpClient) { }

  public Get(): Observable<AirplaneDTO[]> {
    return this.http.get<AirplaneDTO[]>(this.urlBase);
  }

  public GetById(id: number): Observable<IAirplane> {
    return this.http.get<IAirplane>(`${this.urlBase}/${id}`);
  }

  public GetByModelo(modelo: string): Observable<AirplaneDTO[]> {
    let params = new HttpParams()
      .set('modelo', modelo);

    return this.http.get<AirplaneDTO[]>(`${this.urlBase}/modelo/${modelo}`, { params });
  }

  public Post(airplane: IAirplane): Observable<any> {
    return this.http.post<any>(this.urlBase, airplane);
  }

  public Delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}
