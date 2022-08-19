import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BrokerActions, FlashquoteActions } from './actions/action-types';
import { FlashquoteService } from './services/flashquote.service';
import { FlashFormDTO } from './models/Flashquote';
import { concatMap, map, switchMap, catchError, mergeMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadForm, loadQuestions, loadQuestionsError, loadQuestionsSuccess } from './actions/flashquote.actions';
import { AddGroupControlAction } from 'ngrx-forms';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';
import { BrokerService } from './services/broker.service';
import { loadBroker, loadBrokerError, loadBrokerSuccess } from './actions/broker.actions';
import { BrokerDTO } from './models/Broker';


@Injectable()
export class FlashquoteEffects {

  constructor(
    private actions$: Actions,
    private flashquoteService: FlashquoteService,
    private brokerService: BrokerService,
  ) { }

  // https://newdevzone.com/posts/how-to-dispatch-multiple-actions-in-ngrxeffect-redux-observable
  // https://www.angularfix.com/2022/04/ngrx-effects-type-is-not-assignable-to.html
  loadBroker$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBroker),
      mergeMap((action) =>
        this.brokerService.getBrokerById(action.id).pipe(
          switchMap((broker: BrokerDTO) => {
            return [
              loadBrokerSuccess({ broker }),
              loadQuestions({ marketId: broker.marketId })
            ]
          })
        )),
      catchError(() => {
        return of(loadBrokerError())
      })
    )
  )

  loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadQuestions),
      mergeMap((action) => {
        console.log('action', action)
        return this.flashquoteService.getFlashquote(action.marketId).pipe(
          switchMap((flashquote: FlashFormDTO) => {
            console.log('questions', flashquote)
            return [
              loadQuestionsSuccess({ flashquote }),
              loadForm({ flashquote })
            ]
          })
        )
      }
      ),
      catchError(() => of(loadQuestionsError())
      )
    )
  );

  createForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadForm),
      switchMap((data: any) => {
        const questions = data.flashquote.questions
        const filtered = questions.filter((q: any) => !q.isHidden)
        return filtered.map((q: any) => {
          if (q.type === 'REPARTITION') {
            return new AddGroupControlAction('generic', q.id, {});
          }

          if (q.type === 'ADDRESS')
            return new AddGroupControlAction('generic', q.id, {
              search: '',
              street: '',
              postalCode: '',
              city: '',
              houseNumber: '',
              state: '',
              unit: ''
            });
          return new AddGroupControlAction('generic', q.id, '');
        });
      }),
      switchMap((res: any) => [res])
    )
  );
}
