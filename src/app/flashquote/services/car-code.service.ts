import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CarMake } from '../models/CarMake';
import { CarModel } from '../models/CarModel';

@Injectable({
  providedIn: 'root'
})
export class CarCodeService {

  constructor(private http: HttpClient) {

  }

  public getMakePerYear(year: string): Observable<CarMake[]> {
    return this.http.get<CarMake[]>(`${environment.apiURL}/api/publicflash/carcode/` + year, {
      headers: {
        'X-API-Key': '5f9ddde6-4601-49e8-ba9c-7e0195ff3344'
      }
    });
  }

  public getModelPerMakeAndYear(make: number, year: string): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(`${environment.apiURL}/api/publicflash/carcode/` + make + "/" + year, {
      headers: {
        'X-API-Key': '5f9ddde6-4601-49e8-ba9c-7e0195ff3344'
      }
    })
  }
}
