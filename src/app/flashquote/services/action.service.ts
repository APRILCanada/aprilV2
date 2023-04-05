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
  validate(question: Question, controls: FormControlState<any>[], key: any, pathToGroup: string, questions: Question[] | undefined) {
    question.rules.forEach((rule) => {
      const destinationId = rule.destinationId.toString();
      const groupIndex = parseInt(pathToGroup.slice(-1))

      switch (rule.action) {
        case 'RETRIEVE_RESPONSE':
          this.getResponsesFromPreviousAnswer(question, controls[key], parseInt(destinationId), groupIndex, pathToGroup);
          break;
        case 'SHOW':
          this.show(question, rule, controls[key], destinationId, groupIndex, pathToGroup, false, false);
          break;
        case 'HIDE':
          this.hide(rule, controls[key], destinationId, groupIndex, pathToGroup, false);
          break;
        case 'RETRIEVE':
          this.getOptionsFromPreviousAnswer(question, rule, controls[key], destinationId, groupIndex);
          break;
        case 'SEQUENCE':
          if (rule.operation === "EQUALS" || rule.operation === "NOT_EQUAL" ){
            const nextQuestion = questions?.filter(question => question.rules.filter(r => r.id === rule.referenceId).length > 0)[0]
            if(nextQuestion) {
              const nextRule = nextQuestion?.rules.filter(r => r.id === rule.referenceId)[0]
              if(nextRule.action === 'SHOW')this.show(nextQuestion, nextRule, controls[nextQuestion.id], nextRule.destinationId.toString(), groupIndex, pathToGroup, true, this.ruleService.checkRule(rule, controls[key]))
            }
          } 
          if (rule.operation === "COUNT_LESSER_THAN") {
            const firstValueInSequence = this.ruleService.checkRule(rule, controls[key])
            const questionRule = this.sections.find(s => s.id == this.activeSection.id)?.questions.find(q => q.id == rule.questionId)?.rules.find(r => r.id == rule?.referenceId)
            if (questionRule?.action === 'SET_VALUE') {
              this.setValue(questionRule, controls[key], questionRule.destinationId.toString(), groupIndex, pathToGroup, firstValueInSequence);
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

  hide(rule: Rule, control: FormControlState<any>, destinationId: string, groupIndex: number, pathToGroup: string, fromSequence: boolean) {
    if(!fromSequence && rule.isSequenceEnd) return;
    const result = this.ruleService.checkRule(rule, control)
   
    
    pathToGroup = this.overridePath(pathToGroup, destinationId)

    if (result) {
      if(rule.destinationId === 3337 || rule.destinationId === 2723){
        // console.log(fromSequence, rule)
        // console.log('hide', rule.destinationId, destinationId)
        // console.log(!this.temp.has(groupIndex + '.' + destinationId), this.temp)
      }

      if (!this.temp.has(groupIndex + '.' + destinationId)) {
        // let controls = this.formState.controls[this.activeSection.id].controls[groupIndex].controls
        // if(destinationId === '3337' || destinationId === '2723')console.log(destinationId, (controls as any))
        if ((this.formState.controls[this.activeSection.id].controls[groupIndex] as any).controls[destinationId]) {
          this.store.dispatch(new RemoveGroupControlAction(pathToGroup, destinationId));
          this.temp.add(groupIndex + '.' + destinationId) // FIX FOR DOUBLE ACTION DISPATCH
        }
      }
    } else if (rule.value !== control.value) {
      if (this.temp.has(groupIndex + '.' + destinationId)) {
        if (!(this.formState.controls[this.activeSection.id].controls[groupIndex] as any).controls[destinationId]) {
          // console.log(this.formState.controls[this.activeSection.id].controls[groupIndex])
          if(destinationId == '3074' ) return;
            this.store.dispatch(new AddGroupControlAction(pathToGroup, destinationId, ''));
            this.temp.delete(groupIndex + '.' + destinationId) // FIX FOR DOUBLE ACTION DISPATCH
          
        }
      }
    }
  }

  show(question: Question, rule: Rule, control: FormControlState<any>, destinationId: string, groupIndex: number, pathToGroup: string, fromSequence: boolean, previousResult: boolean | undefined) {
   
    if(!fromSequence && rule.isSequenceEnd) return

    const result = this.ruleService.checkRule(rule, control)

    pathToGroup = this.overridePath(pathToGroup, destinationId)
    if ((rule.isSequenceEnd && result && previousResult) || (!fromSequence && result)) {
      
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