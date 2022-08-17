import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getAutoComplete(search:string, lang:string = 'en'){
    if(!search) {
      return of({});
    }
    search = search.trim();
    if (search == "") {
      return of({});
    }
    return this.http.get<any>(`http://localhost:51668/api/geolocation/`+ search +"/"+ lang);
  }
  
  getLocationDetails(locationId: string){
    const body = JSON.stringify(locationId);
    return this.http.post<any>(`http://localhost:51668/api/geolocation/details`, body, {
      headers:{'Content-Type': 'application/json' }
    });
  }
    
}
