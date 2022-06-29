import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormControlState, FormState } from 'ngrx-forms';
import { Question } from '../models/Question';
import { Response } from '../models/Response';
import {
  FormValue,
  State,
} from '../store';
import { CreateGroupElementAction, RemoveGroupElementAction } from '../actions/flashquote.actions';
import { selectFormState, selectQuestions } from '../selectors';


@Injectable({
  providedIn: 'root',
})
export class ActionService {
  questions: Question[] = [];
  formState: FormState<FormValue>;

  constructor(private store: Store<State>) {
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
      }
    });
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
















// validate(form:Form, sectionState:Section[], formSections:FormSection[], currentSection:number): void {
//   var allActions = this.ruleService.actions || [];
//   allActions.forEach(action => {
//     console.log('action', action)
//     var destination = action.destinationId.toString();
//     switch (action.action) {
//       case 'HIDE':
//         this.showHide(formSections, action.key, destination, true);
//         break;
//       case 'SHOW':
//         this.showHide(formSections, action.key, destination, false);
//         break;
//       case 'REFERRED':
//         this.ruleService.addReferred(action.rule);
//         break;
//       case 'EXCLUDED':
//         var section = form.sections.find(x => x.questions.some(y => y.id == action.rule.questionId));
//         if(section != null && form.sections.indexOf(section) == currentSection){
//           this.ruleService.addExcluded(action.rule);
//         }
//         break;
//       case 'SET_VALUE':
//         this.setValue(sectionState, formSections, action.key, action.rule);
//         break;
//       case 'RESET_VALUE':
//         this.setValue(sectionState, formSections, action.key, action.rule, true);
//         break;
//       case 'RETRIEVE': //More like a RETRIEVE_ANSWER
//         this.getOptionsFromPreviousAnswer(formSections, action.rule);
//         break;
//       case 'RETRIEVE_RESPONSE':
//         this.getResponsesFromPreviousAnswer(formSections, action.rule);
//         break;
//     }
//     this.ruleService.actions = this.ruleService.actions.filter(x => x != action);
//   });
// }


// showHide(formSections:FormSection[], _key:string, id: string, hidden: boolean) {
//   formSections.forEach(section => {
//     var control = null;
//     var _question = null;
//     section.formPages.forEach((page:FormPage) => {
//       if(control)
//         return false;
//       for(var key in page.formGroup.controls){
//         if(key == _key){
//           control = page.formGroup.controls[key];
//           break;
//         }
//       }
//       page.questions.forEach(question => {
//         if(question.key == _key){
//           _question = question;
//         }
//       })
//     });
//     if(_question){
//       _question.isHidden = hidden;
//     }
//     if (control) {
//       if (hidden) {
//         control.reset();
//         control.disable();
//         this.ruleService.resetHidden(_question);
//       }
//       else {
//         control.enable();
//       }
//     }
//   });
// }

// setValue(sectionState:Section[], formSections:FormSection[], key:string, rule:Rule, resetValue:boolean = false){
//   var id = rule.destinationId;
//   var newValue = rule.forceValue;
//   var control = null;
//   var question = null;

//   formSections.forEach(section => {
//     section.formPages.forEach((page:FormPage) => {
//       if(page.formGroup.controls[id]){
//         control = page.formGroup.controls[id];
//         if(page.questions.some(q => q.key == key)) {
//           question = page.questions.find(q => q.key == key);
//         }
//         return;
//       }
//     });
//   });

//   if (control && question) {
//     if(!resetValue){
//       control.patchValue(newValue);
//       question.value = newValue;
//     }
//     else {
//       control.patchValue(question.defaultValue);
//       question.value = question.defaultValue;
//     }
//   }
// }

// getOptionsFromPreviousAnswer(formSections:FormSection[], rule:Rule){
//   var id = rule.destinationId.toString();
//   var questionId = rule.questionId.toString();
//   var sourceId = rule.sourceId.toString();
//   var destinationQuestions = [];
//   var answers = new Map<string, string>();
//   var sourceAnswers = [];
//   // use forms value and patchvalue of form instead

//   formSections.forEach(section => {
//     section.formPages.forEach((page:FormPage) => {
//       page.questions.forEach(question => {
//         var key = question.key.split('_')[0];
//         if(key == questionId){
//           if(!answers.has(question.key)) 
//             answers.set(question.key, question.getValue().toString());
//         }
//         if(key == sourceId){
//           sourceAnswers.push(question.getValue().toString());
//         }
//         if(key == id) {
//           if(destinationQuestions.indexOf(question) == -1)
//             destinationQuestions.push(question);
//         }
//       });
//     });
//   });

//   if(sourceId == "0" || answers.size != sourceAnswers.length) {
//     for(var _question of destinationQuestions){
//       if(_question){
//         if(_question.controlType == 'select'){
//           _question["options"] = [];
//           answers.forEach((value: string, key: string) => {
//             _question["options"].push({key:key , title: new Label(value , value)});
//           });
//         }
//       }
//     }
//   }
//   else {
//     for(var _question of destinationQuestions){
//       if(_question){
//         if(_question.controlType == 'select'){
//           _question["options"] = [];
//           var index = 0;
//           answers.forEach((value: string, key: string) => {
//             var labelText = value + '  ' + sourceAnswers[index];
//             _question["options"].push({key:key , title: new Label(labelText , labelText)});
//             index++;
//           });
//         }
//       }
//     }
//   }
  
// }

// getResponsesFromPreviousAnswer(formSections:FormSection[], rule:Rule){
//   //the source is a select question
//   //the destination is a repartition question 
//   //both the source and the destination must have the same responseList
//   var id = rule.destinationId.toString();
//   var questionId = rule.questionId.toString();
//   var destinationQuestions = [];
//   let responses : {key:string, title:Label, showOrder:number}[] = [];
//   // use forms value and patchvalue of form instead

//   formSections.forEach(section => {
//     section.formPages.forEach((page:FormPage) => {
//       page.questions.forEach(question => {
//         var key = question.key.split('_')[0];
//         if(key == questionId){
//           var selectQuestion = question as SelectQuestion;
//           var splittens = selectQuestion.getValue().split(',');
//           responses = selectQuestion.options.filter(o => splittens.indexOf(o.key) > -1);
//         }
//         if(key == id) {
//           if(destinationQuestions.indexOf(question) == -1)
//             destinationQuestions.push(question);
//         }
//       });
//     });
//   });

//   for(var _question of destinationQuestions){
//     if(_question){
//       if(_question.controlType == 'repartition'){ 
//         //could be easily done with select but I won't bother
//         _question["options"] = responses;
//       }
//     }
//   }
// }