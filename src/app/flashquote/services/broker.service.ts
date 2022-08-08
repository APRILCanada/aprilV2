import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrokerDTO } from '../models/Broker';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  constructor(private http: HttpClient) { }

  getBrokerById(id: string): Observable<BrokerDTO> {
    return this.http.get<any>(`https://us-central1-april-canada-c5f17.cloudfunctions.net/api/brokers/${id}`)
  }
}
