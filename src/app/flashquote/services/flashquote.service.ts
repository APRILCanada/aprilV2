import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FlashFormDTO } from '../models/Flashquote';
import { isValid } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class FlashquoteService {
  sectionValidationKeys: any = []
  userExclusions: any = []

  constructor(private http: HttpClient) { }

  getFlashquote(marketId: string): Observable<FlashFormDTO> {
    return this.http.get<any>(`http://localhost:51668/api/publicflash/` + marketId, {
      headers: {
        'x-api-key': '5f9ddde6-4601-49e8-ba9c-7e0195ff3344'
      }
    });
  }


  submitQuote(quote: any) {
    console.log('FORM DATA', JSON.stringify(quote))
    return this.http.post<any>('http://localhost:51668/api/publicflash', JSON.stringify(quote), {
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
        if (key === 'exclusion' || key === 'required' || key === 'pattern' || key === 'email') this.sectionValidationKeys.push(key)
      }
    })
    return this.sectionValidationKeys.every((el: any) => el === 'exclusion')
  }

  resetValidateSectionKeys() {
    this.sectionValidationKeys = []
  }

  getUserExclusions(obj: any) {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object') {
        this.getUserExclusions(obj[key])
        if (key === 'exclusion') this.userExclusions.push(obj[key])
      }
    })
    return this.userExclusions.reduce((acc: any[], curr: any) => {
      console.log('CURR', curr)
      acc.push(curr.errorMessage)
      return acc
    }, [])
  }
}