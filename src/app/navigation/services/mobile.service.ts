import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  isOpened?: boolean;

  constructor() {}

  setState(isOpened: boolean) {
    this.isOpened = isOpened;
    return this.isOpened;
  }

  getState() {
    return this.isOpened;
  }
}
