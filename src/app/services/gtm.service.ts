import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class gtmService {

  constructor() { }

  customEvent(category: any, action: any, wording: any){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
   'event': 'registrationComplete',
   'registrationCountry': 'United States',
   'plan': 'Premium'
  })
 };
}
