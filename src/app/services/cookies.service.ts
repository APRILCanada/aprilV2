import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  cookieActivated: boolean;
  constructor() {}

  get() {
    this.cookieActivated = JSON.parse(localStorage.getItem('cookies')!) || false;
    return this.cookieActivated;
  }

  set(cookieActivated: boolean) {
    this.cookieActivated = cookieActivated;
    localStorage.setItem('cookies', JSON.stringify(this.cookieActivated));
    return this.cookieActivated;
  }
}
