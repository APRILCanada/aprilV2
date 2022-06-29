import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  isLoading: boolean;

  constructor() {}

  loading(isLoading: boolean = false) {
    this.isLoading = isLoading;
    if (isLoading === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }

    this._loading.next(isLoading);

    setTimeout(() => {
      isLoading = false;
      this._loading.next(isLoading);
      document.body.style.overflow = 'scroll';
    }, 3000);
  }

  get() {
    return this.isLoading;
  }
}
