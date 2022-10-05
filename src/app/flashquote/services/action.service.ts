import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AddGroupControlAction, FormControlState, FormGroupControls, FormGroupState, FormState, RemoveGroupControlAction, SetValueAction } from 'ngrx-forms';
import { Question } from '../models/Question';
import { Response } from '../models/Response';
import {
  FormValue,
  State,
} from '../store';
import { CreateGroupElementAction, RemoveGroupElementAction, retrieveOptionsAction } from '../actions/flashquote.actions';
import { selectActiveSection, selectBroker, selectFormState, selectSections } from '../selectors';
import { RuleService } from './rule.service';
import { Rule } from '../models/Rule';
import { FormGroup } from '@angular/forms';
import { filter, map, Observable, pluck, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ActionService {
  questions: Question[] = [];
  formState: FormState<FormValue>;
  formState$: Observable<any>
  activeSection: any;
  marketId: number;
  temp: any[] = [] // FIX FOR DOUBLE ACTION DISPATCH
  temp2: any[] = [] // FIX FOR DOUBLE ACTION DISPATCH

  constructor(private store: Store<State>, private ruleService: RuleService) {
    this.store.pipe(select(selectSections)).subscribe(questions => {
      this.questions = questions
    })
    this.store.pipe(select(selectFormState)).subscribe(state => {
      this.formState = state
    })
    this.store.pipe(select(selectBroker), pluck('marketId')).subscribe(marketId => this.marketId = marketId)

    this.store.pipe(select(selectActiveSection)).subscribe(state => this.activeSection = state)
  }

  validate(question: Question, control: FormControlState<any>, pathToGroup: string) {
    question.rules.forEach((rule) => {
      const destinationId = rule.destinationId;

      switch (rule.action) {
        case 'RETRIEVE_RESPONSE':
          // this.getResponsesFromPreviousAnswer(question, rule, control, destinationId.toString(), pathToGroup);
          break;
        case 'SHOW':
          this.show(question, rule, control, destinationId.toString(), pathToGroup);
          break;
        case 'HIDE':
          this.hide(question, rule, control, destinationId.toString(), pathToGroup);
          break;
        case 'RETRIEVE': //More like a RETRIEVE_ANSWER
          this.getOptionsFromPreviousAnswer(question, rule, control, destinationId.toString(), pathToGroup);
          break;
      }
    });
  }

  hide(question: Question, rule: Rule, control: FormControlState<any>, destinationId: string, pathToGroup: string) {
    const groupId = parseInt(pathToGroup.slice(-1))
    if (rule.value === control.value) {
      if ((this.formState.controls[this.activeSection.id].controls[groupId] as any).controls[destinationId]) {
        this.store.dispatch(new RemoveGroupControlAction('generic.' + this.activeSection.id + '.' + groupId, destinationId));
        this.temp2.push(destinationId) // FIX FOR DOUBLE ACTION DISPATCH
      }
    } else if (rule.value !== control.value) {
      if (this.temp2.includes(destinationId)) {
        if (!(this.formState.controls[this.activeSection.id].controls[groupId] as any).controls[destinationId]) {
          this.store.dispatch(new AddGroupControlAction('generic.' + this.activeSection.id + '.' + groupId, destinationId, ''));
        }
      }
    }
  }

  show(question: Question, rule: Rule, control: FormControlState<any>, destinationId: string, pathToGroup: string) {
    const result = this.ruleService.checkRule(rule, control, destinationId)

    console.log(destinationId, 'destinationId')
    // get the groupId for dynamic allocation
    // groupId is the key of the object in a section (ex. 'generic.35.0' => 0 is the groupId (1st object in the section) while 35 is the sectionId)
    const groupId = parseInt(pathToGroup.slice(-1))

    if (result) {
      if (!this.temp.includes(destinationId)) {
        if (!this.formState.controls[this.activeSection.id] && !(this.formState.controls[this.activeSection.id].controls[groupId] as any).controls[destinationId]) {
          return
        }
        else if (this.formState.controls[this.activeSection.id] && !(this.formState.controls[this.activeSection.id].controls[groupId] as any).controls[destinationId]) {
          if (question.identifier === "HasHadClaimsInLast6Years") {
            // NO CLAIMS GROUP CONTROL IN THE AUTOMOBILE FLASHQUOTE (marketId: 28) //
            if (this.marketId != 28) {
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
            }
          }
          else {
            if ((question.identifier !== 'MinorInfraction' && question.identifier !== 'MajorInfraction')) {
              this.store.dispatch(new AddGroupControlAction('generic.' + this.activeSection.id + '.' + groupId, destinationId, ''));
              this.temp.push(destinationId) // FIX FOR DOUBLE ACTION DISPATCH
            }
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

  getOptionsFromPreviousAnswer(question: Question, rule: Rule, control: FormControlState<any>, destinationId: string, pathToGroup: string) {

    const result = this.ruleService.checkRule(rule, control, destinationId)

    if (result) {

      const groupId = parseInt(pathToGroup.slice(-1))
      const prevValues = (this.formState.controls[this.activeSection.id].controls[groupId].controls as any)[question.id].value;

      let newValue = ''

      if (typeof prevValues === 'string')
        newValue = prevValues
      if (typeof prevValues === 'object') {
        newValue = Object.values(prevValues).join(' ')
      }

      if (!Object.keys(control.errors).length
        && (this.formState.controls[this.activeSection.id].controls[groupId].controls as any)[question.id].isTouched) {
        let sectionId;

        this.questions.forEach((section: any) => {
          section.questions.forEach((question: any) => {
            const result = Object.values(question).includes(parseInt(destinationId))
            if (result) {
              sectionId = section.id
            }
          })
        })
        this.store.dispatch(retrieveOptionsAction({ sectionId: 36, groupId, questionId: parseInt(destinationId), option: newValue }))
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