import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AddGroupControlAction, FormControlState, FormGroupControls, FormGroupState, FormState, RemoveGroupControlAction } from 'ngrx-forms';
import { Question } from '../models/Question';
import { Response } from '../models/Response';
import {
  FormValue,
  State,
} from '../store';
import { CreateGroupElementAction, RemoveGroupElementAction } from '../actions/flashquote.actions';
import { selectActiveSection, selectFormState, selectSections } from '../selectors';
import { RuleService } from './rule.service';
import { Rule } from '../models/Rule';
import { FormGroup } from '@angular/forms';
import { map, Observable, pluck, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ActionService {
  questions: Question[] = [];
  formState: FormState<FormValue>;
  formState$: Observable<any>
  activeSection: any;
  temp: any[] = [] // FIX FOR DOUBLE ACTION DISPATCH

  constructor(private store: Store<State>, private ruleService: RuleService) {
    this.store.pipe(select(selectSections)).subscribe(questions => {
      this.questions = questions
    })
    this.store.pipe(select(selectFormState)).subscribe(state => {
      this.formState = state
    })

    this.store.pipe(select(selectActiveSection)).subscribe(state => this.activeSection = state)
  }

  validate(question: Question, control: FormControlState<any>, pathToGroup: string) {
    question.rules.forEach((rule) => {
      const destinationId = rule.destinationId;

      switch (rule.action) {
        case 'RETRIEVE_RESPONSE':
          this.getResponsesFromPreviousAnswer(question, control, destinationId);
          break;
        case 'SHOW':
          this.showHide(question, rule, control, destinationId.toString(), pathToGroup);
          break;
      }
    });
  }

  showHide(question: Question, rule: Rule, control: FormControlState<any>, destinationId: string, pathToGroup: string) {
    const result = this.ruleService.checkRule(rule, control, destinationId)
    // get the groupId for dynamic allocation
    // groupId is the key of the object in a section (ex. 'generic.35.0' => 0 is the groupId (1st object in the section) while 35 is the sectionId)
    const groupId = parseInt(pathToGroup.slice(-1))

    if (result) {
      if (!this.temp.includes(destinationId)) {
        if (!this.formState.controls[this.activeSection.id] && !(this.formState.controls[this.activeSection.id].controls[groupId] as any).controls[destinationId]) {
          return
        } else if (this.formState.controls[this.activeSection.id] && !(this.formState.controls[this.activeSection.id].controls[groupId] as any).controls[destinationId]) {
          if (question.identifier === "HasHadClaimsInLast6Years") {
            this.store.dispatch(new AddGroupControlAction('generic.' + this.activeSection.id + '.' + groupId, destinationId, [
              {
                "Claim-date": '',
                "Claim-actualDate": '',
                "Claim-details": '',
                "Claim-amount": '',
                "Claim-reserve": '',
                "Claim-opened": ''
              }
            ]))
            this.temp.push(destinationId) // FIX FOR DOUBLE ACTION DISPATCH
          } else {
            this.store.dispatch(new AddGroupControlAction('generic.' + this.activeSection.id + '.' + groupId, destinationId, ''));
            this.temp.push(destinationId) // FIX FOR DOUBLE ACTION DISPATCH
          }
        }
      }
    }
    else {
      if (this.temp.includes(destinationId)) {
        if (this.formState.controls[this.activeSection.id] && (this.formState.controls[this.activeSection.id].controls[groupId] as any).controls[destinationId]) {
          this.store.dispatch(new RemoveGroupControlAction('generic.' + this.activeSection.id + '.' + groupId, destinationId));
          const qId = this.temp.indexOf(destinationId); // FIX FOR DOUBLE ACTION DISPATCH
          if (qId !== -1) {
            // 3
            this.temp.splice(qId, 1);
          }
        }
      }
    }
  }

  getResponsesFromPreviousAnswer(
    question: Question,
    control: FormControlState<any>,
    destinationId: number
  ) {
    const responseKeyList: string[] = [];
    const responses: Response[] = this.questions.find((q) => q.id === question.id)!.responses;
    const selectedResponseKeys: string[] = control.value.split(',');
    const prevValues = Object.keys(this.formState.controls[destinationId].value);

    for (let key of selectedResponseKeys) {
      for (let response of responses) {
        if (key === response.responseKey) responseKeyList.push(response.responseKey);
      }
    }

    // remove input
    if (responseKeyList.length < prevValues.length) {
      const responseKey = prevValues.filter((v) => !responseKeyList.includes(v));
      this.store.dispatch(new RemoveGroupElementAction(responseKey, destinationId));
    }

    // add input
    responseKeyList.forEach((responseKey) => {
      this.store.dispatch(new CreateGroupElementAction(responseKey, destinationId));
    });
  }
}