import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

//import { Form } from '../models/Form';
import { Quote, QuoteFormDTO, QuoteListDTO } from '../models/Quote';
import { Answer } from '../models/Answer';
import { environment } from 'src/environments/environment';
import { QuoteResult } from '../models/QuoteResult';
import { QuoteQuestion } from '../models/QuoteQuestion';
import { RuleService } from './rule.service';
import { Declaration } from '../models/Declaration';
import { OfflineQuote } from '../models/OfflineQuote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  //form: Form;
  answersCache: Map<string, Answer> = new Map<string, Answer>();
  primeCache: Map<string, QuoteResult> = new Map<string, QuoteResult>();

  currentAnswers: string;

  addressCounter: number = 0;

  quoteResult: BehaviorSubject<QuoteResult> = new BehaviorSubject<QuoteResult>(new QuoteResult());

  primeLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  actionSequence: number[];

  constructor(private http: HttpClient, private ruleService: RuleService) { }

  findQuotes(
    filter = '', status = [], market = [], broker: string = "", leads: boolean = false, sortField = 'Id', sortOrder = 'asc',
    pageIndex = 0, pageSize = 10): Observable<{}> {
    return this.http.get<QuoteListDTO[]>(`${environment.apiURL}/api/quote`, {
      params: new HttpParams()
        .set('filter', filter)
        .set('status', status.join())
        .set('market', market.join())
        .set('broker', broker.toString())
        .set('leads', leads ? '1' : '0')
        .set('sortField', sortField)
        .set('sortOrder', sortOrder)
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString())
    })
  }

  prepareQuoteForm(quoteId: string): Observable<QuoteFormDTO> {
    return this.http.get<QuoteFormDTO>(`${environment.apiURL}/api/quote/form/` + quoteId);
  }

  getQuote(quoteId: string): Observable<Quote> {
    return this.http.get<Quote>(`${environment.apiURL}/api/quote/` + quoteId);
  }

  getQuoteByCode(code: string): Observable<Quote> {
    return this.http.get<Quote>(`${environment.apiURL}/api/quote/code/` + code);
  }

  updateAssignation(quoteId: number, brokerId: number) {
    return this.http.post<Quote>(`${environment.apiURL}/api/quote/assignation/` + quoteId, brokerId.toString(), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  createQuote(marketId: string): Observable<Quote> {
    return this.http.post<Quote>(`${environment.apiURL}/api/quote`, marketId, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  createOfflineQuote(quote: OfflineQuote): Observable<void> {
    var body = JSON.stringify(quote);
    return this.http.post<void>(`${environment.apiURL}/api/quote/offline`, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  finalizeQuote(quoteId: string, declaration: Declaration): Observable<Quote> {
    var ans: any = [];
    this.answersCache.forEach(a => ans.push(a));
    declaration.answers = ans;
    var body = JSON.stringify(declaration);
    //TODO DTO for this method in API
    return this.http.put<any>(`${environment.apiURL}/api/quote/` + quoteId, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  copyQuote(id: string): Observable<Quote> {
    return this.http.get<Quote>(`${environment.apiURL}/api/quote/copy/` + id);
  }

  deleteQuote(id: string): Observable<void> { //unused (probably because delete == trash)
    return this.http.delete<void>(`${environment.apiURL}/api/quote/` + id);
  }

  required(quoteId: string, isRequired: boolean, answers: Answer[]) {
    var body = JSON.stringify({ required: isRequired, answers: answers });
    return this.http.post<Quote>(`${environment.apiURL}/api/quote/required/` + quoteId, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  saveAnswers(answers: Answer[], quoteId: string, sectionId: string, completed: boolean): Observable<Quote> {
    this.setAnswerCache(answers, sectionId);
    var ans: Answer[] = [];
    this.answersCache.forEach(a => ans.push(a));
    if (completed) {
      var refFr = this.ruleService.referredList.map(x => x.message.LabelFr).join('||');
      var refEn = this.ruleService.referredList.map(x => x.message.LabelEn).join('||');
      if (ans.some(x => x.key == "@refFr")) {
        const refFrAnswer = ans.find(x => x.key == "@refFr");
        if (refFrAnswer)
          refFrAnswer.value = refFr;
      }
      else {
        ans.push(new Answer("@refFr", "", "ReferredReasonFr", refFr));
      }
      if (ans.some(x => x.key == "@refEn")) {
        var refEnAnswer = ans.find(x => x.key == "@refEn");
        if (refEnAnswer)
          refEnAnswer.value = refEn;
      }
      else {
        ans.push(new Answer("@refEn", "", "ReferredReasonEn", refEn));
      }
    }

    var body = JSON.stringify({ answers: ans, referred: this.ruleService.referred.size > 0, excluded: this.ruleService.excluded.size > 0, completed: completed });
    return this.http.post<Quote>(`${environment.apiURL}/api/answer/` + quoteId + "/", body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  saveBindAnswers(answers: Answer[], quoteId: string, sectionId: string, completed: boolean): Observable<Quote> {
    this.setAnswerCache(answers, sectionId);
    var ans: Answer[] = [];
    this.answersCache.forEach(a => ans.push(a));
    if (completed) {
      var refFr = this.ruleService.referredList.map(x => x.message.LabelFr).join('||');
      var refEn = this.ruleService.referredList.map(x => x.message.LabelEn).join('||');
      if (ans.some(x => x.key == "@refFr")) {
        var refFrAnswer = ans.find(x => x.key == "@refFr");
        if (refFrAnswer)
          refFrAnswer.value = refFr;
      }
      else {
        ans.push(new Answer("@refFr", "", "ReferredReasonFr", refFr));
      }
      if (ans.some(x => x.key == "@refEn")) {
        var refEnAnswer = ans.find(x => x.key == "@refEn");
        if (refEnAnswer)
          refEnAnswer.value = refEn;
      }
      else {
        ans.push(new Answer("@refEn", "", "ReferredReasonEn", refEn));
      }
    }

    var body = JSON.stringify({ answers: ans, referred: this.ruleService.referred.size > 0, excluded: this.ruleService.excluded.size > 0, completed: completed });
    return this.http.post<Quote>(`${environment.apiURL}/api/answer/bind/` + quoteId + "/", body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getPrime(quoteId: string): Observable<QuoteResult> {
    var ans: any[] = [];
    this.answersCache.forEach(a => ans.push(a));
    var body = JSON.stringify(ans);
    this.currentAnswers = body;
    return this.http.post<QuoteResult>(`${environment.apiURL}/api/answer/premiums/` + quoteId + "/", body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  downloadFile(quoteId: number, fileType: string, lang: string = "fr"): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiURL}/api/file/` + quoteId + '/' + fileType + '/' + lang, {
      responseType: 'blob' as 'json',
    });
  }

  refresh(): Observable<any> {
    return this.http.get(`${environment.apiURL}/api/form/refresh`);
  }

  getAutoComplete(search: string, lang: string) {
    if (!search) {
      return of({});
    }
    search = search.trim();
    if (search == "") {
      return of({});
    }
    return this.http.get<any>(`${environment.apiURL}/api/geolocation/` + search + "/" + lang);
  }

  getLocationDetails(locationId: string) {
    var body = JSON.stringify(locationId);
    return this.http.post<any>(`${environment.apiURL}/api/geolocation/details`, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getQuoteQuestion(quoteId: string): Observable<QuoteQuestion[]> {
    return this.http.get<QuoteQuestion[]>(`${environment.apiURL}/api/quotequestion/` + quoteId);
  }

  sendAnswerToUnderwriter(quoteId: string, questions: QuoteQuestion[]) {
    var body = JSON.stringify(questions);
    return this.http.post(`${environment.apiURL}/api/quotequestion/` + quoteId, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  setAnswerCache(answers: Answer[] = [], sectionId: string = ""): void {
    if (answers != null) {
      this.removeSectionFromCache(sectionId);
      answers.forEach(answer => {
        this.updateAnswerCache(answer);
      });
    }

  }

  removeSectionFromCache(sectionId: string) {
    if (sectionId == "")
      return;
    var c = this.answersCache;
    c.forEach((x, y, z) => {
      if (x.section == sectionId)
        this.answersCache.delete(y);
    })
  }

  resetAnswerCache() {
    this.answersCache = new Map<string, Answer>();
  }

  updateAnswerCache(answer: Answer) {
    this.answersCache.set(answer.key + "_" + answer.identifier, answer);
  }

  // resetPrimeCache() {
  //   this.primeCache = new Map<string, QuoteResult>();
  //   this.quoteResult.next(null);
  // }

  updatePrimeCache(results: QuoteResult) {
    this.primeCache.set(this.currentAnswers, results);
  }

  // getValueFromCache(Id: string): Answer {
  //   return this.answersCache.has(Id) ? this.answersCache.get(Id) : null;
  // }

  // retrieveAnswers(quoteId:string){
  //   return this.http.get<Answer[]>(`${environment.apiURL}/api/answer/` + quoteId);
  // }

  getSnap(quoteId: string): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiURL}/api/snap/` + quoteId, {
      responseType: 'blob' as 'json',
    });
  }

  getSnapDocument(refNumber: string): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiURL}/api/snap/document/` + refNumber, {
      responseType: 'blob' as 'json',
    });
  }

}
