import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FlashquoteActions } from './actions/action-types';
import { FlashquoteService } from './services/flashquote.service';
import { FlashFormDTO } from './models/Flashquote';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { FlashquoteLoadedAction } from './actions/flashquote.actions';
import { AddGroupControlAction, createFormGroupState, validate, } from 'ngrx-forms';
import { lessThanOrEqualTo } from 'ngrx-forms/validation';

@Injectable()
export class FlashquoteEffects {
  loadFlashquote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlashquoteActions.loadFlashquote),
      //concatMap((action) => this.flashquoteService.getFlashquote(action.marketId)),
      concatMap((action) => this.flashquoteService.getFlashquote()),
      switchMap((flashquote: any) => {
        return flashquote.questions.map((q: any) => {
          if (q.type === 'REPARTITION')
            return new AddGroupControlAction('contracteur_v2', q.id, {});
          return new AddGroupControlAction('contracteur_v2', q.id, '');
        });
      }),
      switchMap((res: any) => [res])
    )
  );

  loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlashquoteActions.loadFlashquote),
      concatMap((action) => this.flashquoteService.getFlashquote()),
      //concatMap((action) => this.flashquoteService.getFlashquote(action.marketId)),
      map((flashquote: FlashFormDTO) => {
        return new FlashquoteLoadedAction('FLASHQUOTE_LOADED', flashquote);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private flashquoteService: FlashquoteService
  ) { }
}
