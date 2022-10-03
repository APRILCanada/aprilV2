import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BrokerActions, FlashquoteActions } from './actions/action-types';
import { FlashquoteService } from './services/flashquote.service';
import { FlashFormDTO } from './models/Flashquote';
import { concatMap, map, switchMap, catchError, mergeMap, filter, tap, pluck, distinct } from 'rxjs/operators';
import { concat, from, Observable, of } from 'rxjs';
import { createSections, loadForm, loadSections, loadSectionsError, loadSectionsSuccess, setActiveSection } from './actions/flashquote.actions';
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


@Injectable()
export class FlashquoteEffects {
  flashquote: any;

  constructor(
    private actions$: Actions,
    private flashquoteService: FlashquoteService,
    private brokerService: BrokerService,
    private store: Store<State>
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
      mergeMap((action) => {
        return this.flashquoteService.getFlashquote(action.marketId).pipe(
          switchMap((flashquote: FlashFormDTO) => {
            this.flashquote = flashquote
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
        console.log('SECTIONS', sections)
        const sectionsLength = sections.length
        const formSections = sections.reduce((sections: any, section: any, i) => {
          sections[i] = {
            id: section.id,
            title: section.title,
            isRepeat: section.isRepeat,
            index: i,
            isFirst: i === 0,
            isLast: i === sections.length - 1,
            sectionsLength
          }
          return sections
        }, {})

        this.store.dispatch(setActiveSection({ activeSection: formSections[2] }))
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
                  firstName: '',
                  lastName: ''
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
                  "Vehicle-Model": ''
                });

              else return new AddGroupControlAction('generic.' + section.id + '.0', q.id, '')
            })
        })

        // we get an array of arrays (each section) that must be flattened
        flattenedSections = [...new Set(flattenedSections.flatMap(x => x))]
        return flattenedSections
      }),
      distinct(({ name }) => name),
      switchMap((res: any) => [res]
      )
    )
  )
}