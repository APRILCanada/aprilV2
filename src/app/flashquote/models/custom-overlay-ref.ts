import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export type CloseEvent = {
    type: 'backdropClick' | 'close' | 'apply';
    data: any;
}

export class CustomOverlayRef {

  private _id: any;
  private afterClosed = new Subject<CloseEvent>();
  afterClosed$ = this.afterClosed.asObservable();

  constructor(private overlayRef: OverlayRef) {

   }

  close(type?:'backdropClick' | 'close' | 'apply', data?: any): void {
    this._close(type, data)
  }

  private _close(type: any, data: any) {
    this.overlayRef.dispose();
    this.afterClosed.next({
      type,
      data
    });
    this.afterClosed.complete();
  }
}