import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FlashFormDTO } from '../models/Flashquote';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { LanguageService } from 'src/app/services/language.service';
import { BrokerDTO } from '../models/Broker';

@Injectable({
  providedIn: 'root',
})
export class FlashquoteService {
  sectionValidationKeys: any = []
  userExclusions: any = []
  result: Observable<any>;
  guid: string;
  customerEmail: string;
  customerPhone: string;

  setClientInfo(customerEmail: string, customerPhone: string) {
    this.customerEmail = customerEmail;
    this.customerPhone = customerPhone;
  }

  setGUID(guid:string) {
    this.guid = guid
  }

  constructor(
    private http: HttpClient,   
    public language: LanguageService,  
    private fireFunctions: AngularFireFunctions) { }

  getFlashquote(marketId: string, apiKey: string): Observable<FlashFormDTO> {
    return this.http.get<any>(`${environment.apiURL}/api/flash/` + marketId, {
      headers: {
        'x-api-key': apiKey
      }
    });
  }

  submitQuote(quote: any, broker: BrokerDTO) {
    if(quote.MarketId == '76' && environment.production) {quote.MarketId = '74'}


    return this.http.post<any>(`${environment.apiURL}/api/flash`, JSON.stringify(quote), {
      headers: { 'Content-Type': 'application/json', 'x-api-key': broker.aprilonId }
    });
  }

  submitQualifiedLead(broker: BrokerDTO) {
    let dto = { QuoteGUID: this.guid, CustomerEmail: this.customerEmail, CustomerPhone: this.customerPhone, Language: this.language.get()};
    return this.http.post<any>(`${environment.apiURL}/api/flash/qualified`, JSON.stringify(dto), {
      headers: { 'Content-Type': 'application/json', 'x-api-key': broker.aprilonId },
    });
  }

  // check if the errors are only of type exclusions
  validateSection(obj: any) {
    // no error object provides = form is valid
    if (!obj) return true;

    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object') {
        this.validateSection(obj[key])
        if (key === 'exclusion' ||
          key === 'required' ||
          key === 'pattern' ||
          key === 'email' ||
          key === 'contractorExclusion' ||
          key === 'valRep'
          ) this.sectionValidationKeys.push(key)
      }
    })
    // only exclusion error type: good to go to next section!
    return this.sectionValidationKeys.every((el: any) => el === 'exclusion' || el === 'contractorExclusion')
  }

  resetValidateSectionKeys() {
    this.sectionValidationKeys = []
  }

  getUserExclusions(obj: any) {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object') {
        this.getUserExclusions(obj[key])
        if (key === 'exclusion' || key === 'contractorExclusion') this.userExclusions.push(obj[key])
      }
    })
    return this.userExclusions.reduce((acc: any[], curr: any) => {
      acc.push(curr.errorMessage)
      return acc
    }, [])
  }

}