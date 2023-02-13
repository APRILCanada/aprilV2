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


  constructor(
    private http: HttpClient,   
    public language: LanguageService,  
    private fireFunctions: AngularFireFunctions) { }

  getFlashquote(marketId: string): Observable<FlashFormDTO> {
    return this.http.get<any>(`${environment.apiURL}/api/publicflash/` + marketId, {
      headers: {
        'x-api-key': '5f9ddde6-4601-49e8-ba9c-7e0195ff3344'
      }
    });
  }


  submitQuote(quote: any, broker: BrokerDTO) {
    if(quote.MarketId == '76' && environment.production) {quote.MarketId = '74'}

    //ADD EMAIL FUNCTIONS
    this.sendEmail(quote, broker)
    return this.http.post<any>(`${environment.apiURL}/api/publicflash`, JSON.stringify(quote), {
      headers: { 'Content-Type': 'application/json', 'x-api-key': '5f9ddde6-4601-49e8-ba9c-7e0195ff3344' }
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

  sendEmail(quote: any, broker: BrokerDTO){
    if(quote){
      console.log('result', quote.Answers)
      console.log('broker', broker)
      const callable = this.fireFunctions.httpsCallable('sendDirectContractor');
      this.result = callable({
        brokerEmail: broker.email,
        fullName: quote?.Answers[7]?.value || '',
        email: quote?.Answers[8]?.value || '',
        phoneNumber: quote?.Answers[9]?.value || '',
        limit: quote?.Answers[1]?.value || '',
        revenue: quote?.Answers[2]?.value || '',
        yBusiness: quote?.Answers[4]?.value || '',
        yExperience: quote?.Answers[3]?.value || '',
        language: this.language.get(),
      });
      this.result.subscribe();
    }
  }
}