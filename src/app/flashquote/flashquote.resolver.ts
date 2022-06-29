import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { AppState } from '../reducers/app.reducer';
import { FlashFormDTO } from './models/Flashquote';
import { loadFlashquote } from './actions/flashquote.actions';
import { selectAllQuestionsLoaded } from './selectors';

@Injectable()
export class FlashquoteResolver implements Resolve<FlashFormDTO> {
  loading = false;
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(selectAllQuestionsLoaded),
      tap((allQuestionsLoaded) => {
        if (!this.loading && !allQuestionsLoaded) {
          this.loading = true;
          this.store.dispatch(
            loadFlashquote({ marketId: route.params['marketId'] })
          );
        }
      }),
      filter((allQuestionsLoaded) => allQuestionsLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
