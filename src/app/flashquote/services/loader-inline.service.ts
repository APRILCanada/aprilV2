import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderInlineService {public _loadingInline: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
  false
);

constructor() {}

loading(isLoadingInline: boolean = false) {
  this._loadingInline.next(isLoadingInline);
}

}