import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    return this.http.get<any>(`${environment.apiURL}/api/geolocation/`+ search +"/"+ lang);
  }
  
  getLocationDetails(locationId: string){
    const body = JSON.stringify(locationId);
    return this.http.post<any>(`${environment.apiURL}/api/geolocation/details`, body, {
      headers:{'Content-Type': 'application/json' }
    });
  }
    
}
