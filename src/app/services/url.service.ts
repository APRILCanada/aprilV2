import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public previousUrl$: Observable<string> = this.previousUrl.asObservable();

  constructor(private router: Router) {}

  setPreviousUrl(previousUrl: string) {
    this.previousUrl.next(previousUrl);
    return this.previousUrl.value;
  }

  getPreviousUrl() {
    return this.previousUrl.value;
  }

  getCurrentUrl() {
    return this.router.url;
  }
}
