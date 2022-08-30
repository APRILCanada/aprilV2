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

  constructor(private http:HttpClient) {

  }
  
  public getMakePerYear(year: string):Observable<CarMake[]>{
    return this.http.get<CarMake[]>(`${environment.apiURL}/api/publicflash/carcode/`+ year);
  }

  public getModelPerMakeAndYear(make: number, year: string):Observable<CarModel[]>{
    return this.http.get<CarModel[]>(`${environment.apiURL}/api/publicflash/carcode/` + make + "/" + year);
  }
}
