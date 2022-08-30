import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AddGroupControlAction, FormControlState, FormState, RemoveGroupControlAction } from 'ngrx-forms';
import { Question } from '../models/Question';
import { Response } from '../models/Response';
import {
  FormValue,
  State,
} from '../store';
import { CreateGroupElementAction, RemoveGroupElementAction } from '../actions/flashquote.actions';
import { selectFormState, selectQuestions } from '../selectors';
import { RuleService } from './rule.service';


@Injectable({
  providedIn: 'root',
})
export class ActionService {
  questions: Question[] = [];
  formState: FormState<FormValue>;

  constructor(private store: Store<State>, private ruleService: RuleService) {
    this.store.pipe(select(selectQuestions)).subscribe(questions => {
      this.questions = questions
    })
    this.store.pipe(select(selectFormState)).subscribe(state => {
      this.formState = state
    })
  }

  validate(question: Question, control: FormControlState<any>) {
    question.rules.forEach((rule) => {
      const destinationId = rule.destinationId;

      switch (rule.action) {
        case 'RETRIEVE_RESPONSE':
          this.getResponsesFromPreviousAnswer(question, control, destinationId);
          break;
        case 'SHOW':
          this.showHide(question, rule, control, destinationId.toString());
          break;
      }
    });

  }

  showHide(question: Question, rule: any, control: any, destinationId: string) {
  const result = this.ruleService.checkRule(rule, control)
    console.log('infinite loop')

    if (result) {
      if (typeof this.formState.controls[destinationId] === 'undefined') {
        // console.log('nononononon', this.formState.controls[destinationId], destinationId)
        // https://stackoverflow.com/questions/61311351/how-to-dynamically-add-formgroup-controls-to-formarray-in-angular-while-the-stat
        if (question.identifier === "HasHadClaimsInLast6Years") {
          this.store.dispatch(new AddGroupControlAction('generic', destinationId, [
            {
              "Claim-date-1": '',
              "Claim-actualDate-1": '',
              "Claim-details-1": '',
              "Claim-amount-1": '',
              "Claim-reserve-1": '',
              "Claim-opened-1": ''
            }
          ]))
        } else {
         this.store.dispatch(new AddGroupControlAction('generic', destinationId, ''));
        }
      }
    }
    else {
      if (this.formState.controls[destinationId]) {
        this.store.dispatch(new RemoveGroupControlAction('generic', destinationId));
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