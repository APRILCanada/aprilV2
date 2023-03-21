import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AddGroupControlAction, FormControlState, FormState, RemoveGroupControlAction, SetValueAction } from 'ngrx-forms';
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
import { Observable, pluck } from 'rxjs';
import { Section } from '../models/Section';
import { ActiveSection } from '../models/ActiveSection';


@Injectable({
  providedIn: 'root',
})
export class ActionService {
  sections: Section[] = [];
  formState: FormState<FormValue>;
  formState$: Observable<any>
  activeSection: ActiveSection;
  marketId: number;
  temp = new Set() // FIX FOR DOUBLE ACTION DISPATCH

  constructor(private store: Store<State>, private ruleService: RuleService) {
    this.store.pipe(select(selectSections)).subscribe((sections: Section[]) => this.sections = sections)
    this.store.pipe(select(selectFormState)).subscribe(state => this.formState = state)
    this.store.pipe(select(selectBroker), pluck('marketId')).subscribe(marketId => this.marketId = marketId)
    this.store.pipe(select(selectActiveSection)).subscribe(state => this.activeSection = state)
  }

  // validate the rules for any questions
  validate(question: Question, control: FormControlState<any>, pathToGroup: string) {
    question.rules.forEach((rule) => {
      const destinationId = rule.destinationId.toString();
      const groupIndex = parseInt(pathToGroup.slice(-1))

      switch (rule.action) {
        case 'RETRIEVE_RESPONSE':
          this.getResponsesFromPreviousAnswer(question, control, parseInt(destinationId), groupIndex, pathToGroup);
          break;
        case 'SHOW':
          this.show(question, rule, control, destinationId, groupIndex, pathToGroup);
          break;
        case 'HIDE':
          this.hide(rule, control, destinationId, groupIndex, pathToGroup);
          break;
        case 'RETRIEVE':
          this.getOptionsFromPreviousAnswer(question, rule, control, destinationId, groupIndex);
          break;
        case 'SEQUENCE':
          if (rule.operation === "COUNT_LESSER_THAN") {
            const firstValueInSequence = this.ruleService.checkRule(rule, control)
            const questionRule = this.sections.find(s => s.id == this.activeSection.id)?.questions.find(q => q.id == rule.questionId)?.rules.find(r => r.id == rule?.referenceId)
            if (questionRule?.action === 'SET_VALUE') {
              this.setValue(questionRule, control, questionRule.destinationId.toString(), groupIndex, pathToGroup, firstValueInSequence);
            }
          }
          break;
      }
    });
  }

  setValue(rule: Rule, control: FormControlState<any>, destinationId: string, groupIndex: number, pathToGroup: string, firstValueInSequence?: boolean) {
    let result = this.ruleService.checkRule(rule, control)

    if (!this.temp.has(groupIndex + '.' + destinationId)) {
      if (!(this.formState.controls[this.activeSection.id].controls[groupIndex] as any).controls[destinationId]) {
        if (control.value instanceof Object) {
          this.store.dispatch(new AddGroupControlAction(pathToGroup, destinationId, {
            [rule.forceValue]: rule.forceValue
          }))
        } else {
          this.store.dispatch(new AddGroupControlAction(pathToGroup, destinationId, rule.forceValue))
        }
      }
      this.temp.add(groupIndex + '.' + destinationId) // FIX FOR DOUBLE ACTION DISPATCH
    }

    if (firstValueInSequence && result) {
      this.store.dispatch(new SetValueAction(pathToGroup + '.' + destinationId + '.' + rule.forceValue, rule.forceValue))
    } else {
      this.store.dispatch(new SetValueAction(pathToGroup + '.' + destinationId + '.' + rule.forceValue, ''))
    }
  }

  hide(rule: Rule, control: FormControlState<any>, destinationId: string, groupIndex: number, pathToGroup: string) {
    const result = this.ruleService.checkRule(rule, control)
    // console.log('hide', rule.destinationId, destinationId)
    pathToGroup = this.overridePath(pathToGroup, destinationId)

    if (result) {
      if (!this.temp.has(groupIndex + '.' + destinationId)) {
        if ((this.formState.controls[this.activeSection.id].controls[groupIndex] as any).controls[destinationId]) {
          this.store.dispatch(new RemoveGroupControlAction(pathToGroup, destinationId));
          this.temp.add(groupIndex + '.' + destinationId) // FIX FOR DOUBLE ACTION DISPATCH
        }
      }
    } else if (rule.value !== control.value) {
      if (this.temp.has(groupIndex + '.' + destinationId)) {
        if (!(this.formState.controls[this.activeSection.id].controls[groupIndex] as any).controls[destinationId]) {
          // console.log(this.formState.controls[this.activeSection.id].controls[groupIndex])
          if(destinationId == '3074') return;
            this.store.dispatch(new AddGroupControlAction(pathToGroup, destinationId, ''));
            this.temp.delete(groupIndex + '.' + destinationId) // FIX FOR DOUBLE ACTION DISPATCH
          
        }
      }
    }
  }

  show(question: Question, rule: Rule, control: FormControlState<any>, destinationId: string, groupIndex: number, pathToGroup: string) {
    const result = this.ruleService.checkRule(rule, control)
    // console.log('show', destinationId, result)
    pathToGroup = this.overridePath(pathToGroup, destinationId)

    if (result) {
      if (!this.temp.has(groupIndex + '.' + destinationId)) {
        if (!this.formState.controls[this.activeSection.id] && !(this.formState.controls[this.activeSection.id].controls[groupIndex] as any).controls[destinationId]) {
          return
        }
        else if (this.formState.controls[this.activeSection.id] && !(this.formState.controls[this.activeSection.id].controls[groupIndex] as any).controls[destinationId]) {
          if (question.identifier === "HasHadClaimsInLast6Years") {
            // NO CLAIMS GROUP CONTROL IN THE AUTOMOBILE FLASHQUOTE (marketId: 28) //
            if (this.marketId != 28) {
              console.log('PATH TO GROUP', pathToGroup)
              this.store.dispatch(new AddGroupControlAction(pathToGroup, destinationId, [
                {
                  "Claim-date": '',
                  "Claim-actualDate": '',
                  "Claim-details": '',
                  "Claim-amount": '',
                  "Claim-reserve": '',
                  "Claim-opened": ''
                }
              ]))
              this.temp.add(groupIndex + '.' + destinationId) // FIX FOR DOUBLE ACTION DISPATCH
            }
          }
          else {
            if ((question.identifier !== 'MinorInfraction' && question.identifier !== 'MajorInfraction')) {
              if(destinationId != '3074'){
              this.store.dispatch(new AddGroupControlAction(pathToGroup, destinationId, {}));
              this.temp.add(groupIndex + '.' + destinationId) // FIX FOR DOUBLE ACTION DISPATCH 
              }
            }
          }
        }
      }
    }
    else {
      if (this.temp.has(groupIndex + '.' + destinationId)) {
        if (this.formState.controls[this.activeSection.id] && (this.formState.controls[this.activeSection.id].controls[groupIndex] as any).controls[destinationId]) {
          this.store.dispatch(new RemoveGroupControlAction(pathToGroup, destinationId));
          this.temp.delete(groupIndex + '.' + destinationId) // FIX FOR DOUBLE ACTION DISPATCH
        }
      }
    }
  }

  getOptionsFromPreviousAnswer(question: Question, rule: Rule, control: FormControlState<any>, destinationId: string, groupIndex: number) {
    const result = this.ruleService.checkRule(rule, control)

    if (result) {
      const sectionLength = this.formState.controls[this.activeSection.id].controls.length
      let newValue = ''

      for (let i = 0; i <= sectionLength - 1; i++) {
        const prevValues = (this.formState.controls[this.activeSection.id].controls[i].controls as any)[question.id].value;
        if (typeof prevValues === 'string')
          newValue += prevValues + ','
        if (typeof prevValues === 'object') {
          newValue += Object.values(prevValues).join(' ') + ','
        }
      }

      if (!Object.keys(control.errors).length
        && (this.formState.controls[this.activeSection.id].controls[groupIndex].controls as any)[question.id].isTouched) {
        let sectionId;

        this.sections.forEach((section: any) => {
          section.questions.forEach((question: any) => {
            const result = Object.values(question).includes(parseInt(destinationId))
            if (result) {
              sectionId = section.id
            }
          })
        })

        this.store.dispatch(retrieveOptionsAction({ sectionId: 36, questionId: parseInt(destinationId), option: newValue }))
      }
    }
  }

  getResponsesFromPreviousAnswer(
    question: Question,
    control: FormControlState<any>,
    destinationId: number,
    groupIndex: number,
    pathToGroup: string
  ) {

    const responseKeyList: string[] = [];
    const responses: Response[] = question.responses
    const selectedResponseKeys: string[] = control.value.split(',');
    let prevValues: any = []


    if ((this.formState.controls[this.activeSection.id].controls[groupIndex].controls as any)[destinationId]) {
      prevValues = Object.keys((this.formState.controls[this.activeSection.id].controls[groupIndex].controls as any)[destinationId].value)
    } else {
      prevValues = (this.formState.controls[this.activeSection.id].controls[groupIndex].controls as any)[question.id].value.split(",")
    }


    for (let key of selectedResponseKeys) {
      for (let response of responses) {
        if (key === response.responseKey) responseKeyList.push(response.responseKey);
      }
    }

    // remove input
    if (responseKeyList.length < prevValues.length) {
      const responseKey = prevValues.filter((v: any) => !responseKeyList.includes(v));
      this.store.dispatch(new RemoveGroupElementAction(responseKey, destinationId, pathToGroup));
    }

    // add input
    responseKeyList.forEach((responseKey) => {
      this.store.dispatch(new CreateGroupElementAction(responseKey, destinationId, pathToGroup));
    });
  }

  overridePath(pathToGroup: string, destinationId: string) {
    let sectionId: string = '';
    let destId = parseInt(destinationId)

    this.sections.map(section => section.questions.map(q => {
      if (q.id === destId) sectionId = section.id.toString();
    })
    )

    const pathArr = pathToGroup.split('.')
    if (sectionId && sectionId != pathArr[1]) {
      pathArr[1] = sectionId;
      pathArr[2] = '0';
      return pathArr.join('.')
    }
    return pathToGroup
  }
}