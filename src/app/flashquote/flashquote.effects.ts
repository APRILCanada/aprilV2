import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BrokerActions, FlashquoteActions } from './actions/action-types';
import { FlashquoteService } from './services/flashquote.service';
import { FlashFormDTO } from './models/Flashquote';
import { concatMap, map, switchMap, catchError, mergeMap, filter, tap, pluck, distinct } from 'rxjs/operators';
import { concat, from, Observable, of } from 'rxjs';
import { createSections, formLoaded, loadForm, loadSections, loadSectionsError, loadSectionsSuccess, setActiveSection } from './actions/flashquote.actions';
import { AddArrayControlAction, AddGroupControlAction } from 'ngrx-forms';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';
import { BrokerService } from './services/broker.service';
import { loadBroker, loadBrokerError, loadBrokerSuccess } from './actions/broker.actions';
import { BrokerDTO } from './models/Broker';
import { Section } from './models/Section';
import { State } from './store';
import { SectionResult } from './models/SectionResult';
import { Question } from './models/Question';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable()
export class FlashquoteEffects {
  flashquote: any;

  constructor(
    private actions$: Actions,
    private flashquoteService: FlashquoteService,
    private brokerService: BrokerService,
    private store: Store<State>,
    private router: Router
  ) { }

  // https://newdevzone.com/posts/how-to-dispatch-multiple-actions-in-ngrxeffect-redux-observable
  // https://www.angularfix.com/2022/04/ngrx-effects-type-is-not-assignable-to.html
  loadBroker$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBroker),
      mergeMap((action) =>
        this.brokerService.getBrokerById(action.id).pipe(
          switchMap((broker: BrokerDTO) => {
            localStorage.setItem('market', broker.marketId);
            return [
              loadBrokerSuccess({ broker }),
              loadSections({ marketId: broker.marketId })
            ]
          })
        )),
      catchError(() => {
        return of(loadBrokerError())
      })
    )
  )

  loadSections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSections),
      tap((action) => {if(action.marketId == '76' && environment.production) {action.marketId = '74'}}),
      mergeMap((action) => {
        return this.flashquoteService.getFlashquote(action.marketId).pipe(
          switchMap((flashquote: FlashFormDTO) => {
            this.flashquote = flashquote
            if(this.flashquote.marketId == 76 && environment.production) {this.flashquote.marketId = 74};
            return [
              loadSectionsSuccess({ flashquote }),
              createSections({ flashquote })
            ]
          })
        )
      }
      ),
      catchError(() => of(loadSectionsError())
      )
    )
  );

  createSections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createSections),
      pluck('flashquote', 'sections'),
      mergeMap((sections) => {
        const sectionsLength = sections.length
        const formSections = sections.reduce((sections: any, section: any, i) => {
          sections[i] = {
            id: section.id,
            title: section.title,
            isRepeat: section.isRepeat,
            index: i,
            isFirst: i === 0,
            isLast: i === sectionsLength - 1,
            maxRepeat: section.maxRepeat,
            isPrime: false,
            sectionsLength
          }
          return sections
        }, {})

        this.store.dispatch(setActiveSection({ activeSection: formSections[0] }))
        return sections.map(section => new AddGroupControlAction('generic', section.id, [{}]))
      }),
      switchMap((res: any) => {
        return [
          loadForm({ flashquote: this.flashquote }),
          res
        ]
      })
    )
  )

  createForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadForm),
      pluck('flashquote', 'sections'),
      switchMap((sections) => {
        let flattenedSections: any[] = []

        flattenedSections = sections.map(section => {
          return section.questions.filter((q: any) => !q.isHidden)
            .map(q => {
              // we need to insert the question into the first object of the section array
              if (q.type === 'REPARTITION') {
                let responses: any = {}
                q.responses.forEach((r: any) => responses[r.responseKey] = '')
                return new AddGroupControlAction('generic.' + section.id + '.0', q.id, responses);
              }

              if (q.type === 'IDENTIFICATION')
                return new AddGroupControlAction('generic.' + section.id + '.0', q.id, {
                  "Driver-FirstName": '',
                  "Driver-LastName": ''
                })

              if (q.type === 'ADDRESS')
                return new AddGroupControlAction('generic.' + section.id + '.0', q.id, {
                  "search": '',
                  "MailingAddress-Street": '',
                  "MailingAddress-PostalCode": '',
                  "MailingAddress-City": '',
                  "MailingAddress-StreetNumber": '',
                  "MailingAddress-Province": '',
                  "MailingAddress-Unit": ''
                });

              if (q.type === 'AUTO')
                return new AddGroupControlAction('generic.' + section.id + '.0', q.id, {
                  "Vehicle-Year": '',
                  "Vehicle-Make": '',
                  "Vehicle-Model": '',
                  "Vehicle-Code": ''
                });

              else return new AddGroupControlAction('generic.' + section.id + '.0', q.id, '')
            })
        })

        // we get an array of arrays (each section) that must be flattened
        return [...new Set(flattenedSections.flatMap(x => x))]

      }),
      distinct(({ name }) => name),
      switchMap((res: any) => [res, formLoaded({ isFormLoaded: true })]
      )
    )
  )
}