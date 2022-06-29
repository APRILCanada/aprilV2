import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/Question';
import { Rule } from '../models/Rule';


@Injectable({
  providedIn: 'root'
})
export class RuleService {
  constructor() { }

  rules:Rule[] = [];
  questions:Question[] = [];
  // triggers:string[] = [];
  // sequence:Map<string,Rule> = new Map<string, Rule>();
  // actions:Action[] = [];
  actions: any[] = []

  // sequenceTriggered: Map<string,Rule[]> = new Map<string, Rule[]>();
  // actionSequenceTriggered: Map<string, string[]> = new Map<string, string[]>();

  // referred:Map<number,Rule> = new Map<number,Rule>();
  // excluded:Map<number,Rule> = new Map<number,Rule>();

  // excludedList: Rule[] = [];
  // referredList: Rule[] = [];

  // isReferred:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // isExcluded:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // setQuestions(questions:QuestionBase<any>[]){
  //   this.questions = questions;
  // }

  // reset(){
  //   this.questions = [];
  //   this.rules = [];
  //   this.triggers = [];
  //   this.sequence = new Map<string,Rule>();
  //   this.actions = [];
  //   this.sequenceTriggered = new Map<string, Rule[]>();
  //   this.referred = new Map<number, Rule>();
  //   this.excluded = new Map<number, Rule>();
  //   this.validateExcluded();
  //   this.validateReferred();

  // }

  checkRules(question:Question){
    // question.rules.forEach(rule =>
    //   {
    //     var index = question.key.indexOf('_') == -1 ? "" : question.key.split('_')[1];
    //     var result = question.isHidden ? false : this.validateRule(rule, question);
    //     if(result){
    //       this.validateSequence(rule, question.key, index);
    //     }
    //     else{
    //       this.validateTriggers(rule, question.key, index);
    //     }
    //   }
    // );
    // question.isDirty = false;
  }

  // checkValidation(questionComponent:QuoteQuestionComponent){
  //   var question = questionComponent.question;
  //   if(question.rules.some(x => x.isValidation)){
  //     var rules = question.rules.filter(x => x.isValidation);
  //     rules.forEach(rule => {
  //       var result = this.validateRule(rule, question);
  //       if(result){
  //         questionComponent.invalid = true;
  //         questionComponent.validationMessages.push(rule.message);
  //       }
  //     })
  //   }
  // }

  // checkValidationUniversal(questionComponent:UniversalQuestionComponent){
  //   var question = questionComponent.question;
  //   if(question.rules.some(x => x.isValidation)){
  //     var rules = question.rules.filter(x => x.isValidation);
  //     rules.forEach(rule => {
  //       var result = this.validateRule(rule, question);
  //       if(result){
  //         questionComponent.invalid = true;
  //         questionComponent.validationMessages.push(rule.message);
  //       }
  //     })
  //   }
  // }

  validateRule(rule:Rule, question:Question) {}
    // var value;
    // var add = 0;
    // var result;
    // if(rule.isFromResponseList){
    //   rule.responseList.forEach(r => {
    //     var numberToAdd = parseFloat(question['options'].find(x => x.key == r).value.replace(",", ".").replace(/\s/g, ""));
    //     add += numberToAdd;
    //   });
    //   value = add.toString();
    // }
    // else if(rule.fromIdentifier){
    //   // console.log(rule, question);
    //   for(var key in question.value){
    //     if(key.toLowerCase().indexOf(rule.identifier.toLowerCase()) > -1){
    //       value = question.value[key].toString();
    //     }
    //   }
    // }
    // else if(rule.isIdentifierGrouped){
    //   value = [];
    //   for(var key in question.value){
    //     value.push(question.value[key] || "");
    //   }
    // }
    // else if(rule.isSplittable){
    //   try {
    //     value = question.value.split();
    //   }
    //   catch{
    //     value = question.value;
    //   }
    // }
    // else {
    //   value = question.value;
    // }
    // switch(rule.operation){
    //   case 'EQUALS':
    //     result = value == rule.value;
    //     break;
    //   case 'NOT_EQUAL':
    //     result = value != rule.value;
    //     break;
    //   case 'GREATER_THAN':
    //     result = this.isGreaterThan(value, rule.value);
    //     break;
    //   case 'LESSER_THAN':
    //     result = this.isLesserThan(value, rule.value);
    //     break;
    //   case 'GREATER_EQUAL':
    //     result = this.isGreaterThan(value, rule.value, true);
    //     break;
    //   case 'LESSER_EQUAL':
    //     result = this.isLesserThan(value, rule.value, true);
    //     break;
    //   case 'CONTAINS':
    //     result = this.contains(value, rule.value);
    //     break;
    //   case 'NOT_CONTAIN':
    //     result = this.contains(value, rule.value, true);
    //     break;
    //   case 'EMPTY':
    //     result = this.isEmpty(value);
    //     break;
    //   case 'NOT_EMPTY':
    //     result = this.isEmpty(value, true);
    //     break;
      // case 'PROVINCE_IS':
      //   result = this.provinceIs(rule.value, value);
      //   break;
      // case 'PROVINCE_IS_NOT':
      //   result = this.provinceIs(rule.value, value, true);
      //   break;
      // case 'CLAIMS_GREATER_THAN':
      //   result = this.claimsRules(value, rule.value, 'gt');
      //   break;
      // case 'CLAIMS_LESSER_THAN':
      //   result = this.claimsRules(value, rule.value, 'lt');
      //   break;
      // case 'CLAIMS_GREATER_EQUAL':
      //   result = this.claimsRules(value, rule.value, 'gt', true);
      //   break;
      // case 'CLAIMS_LESSER_EQUAL':
      //   result = this.claimsRules(value, rule.value, 'lt', true);
      //   break;
      // case 'CLAIMS_EQUAL':
      //   result = this.claimsRules(value, rule.value, 'eq');
      //   break;
      // case 'CLAIMS_OPENED':
      //   result = this.claimsRules(value, rule.value, 'op');
      //   break;
      // case "CLAIMS_COUNT":
      //   result = this.claimsRules(value, rule.value, 'co');
      //   break;
      // case 'RETRIEVE_OPTIONS':
      //   result = true;
      //   break;
      // case 'DATE_GREATER_THAN':
      //   result = this.dateGreaterThan(value, rule.value);
      //   break;
      // case 'DATE_LESSER_THAN':
      //   result = this.dateLesserThan(value, rule.value);
      //   break;
      // case 'DATE_GREATER_EQUAL':
      //   result = this.dateGreaterThan(value, rule.value, true);
      //   break;
      // case 'DATE_LESSER_EQUAL':
      //   result = this.dateLesserThan(value, rule.value, true);
      //   break;
      // case 'YEAR_GREATER_THAN':
      //   result = this.yearGreaterThan(value, rule.value);
      //   break;
      // case 'YEAR_LESSER_THAN':
      //   result = this.yearLesserThan(value, rule.value);
      //   break;
      // case 'YEAR_GREATER_EQUAL':
      //   result = this.yearGreaterThan(value, rule.value, true);
      //   break;
      // case 'YEAR_LESSER_EQUAL':
      //   result = this.yearLesserThan(value, rule.value, true);
      //   break;
  //   }
  //   return result;
  // }

  // validateSequence(rule:Rule, key:string, index:string):void{
  //   var seqKey = rule.id.toString();
  //   var refSeqKey = rule.referenceId.toString();
  //   if(this.sequence.has(seqKey)){
  //     if(rule.isSequenceEnd){
  //       this.addAction(rule, key, index);
  //       this.addToSequenceTriggered(rule, seqKey, index);
  //       this.addToSourceSequenceTriggered(rule, seqKey, refSeqKey, index);
  //     }
  //     else{
  //       this.addToSourceSequenceTriggered(rule, seqKey, refSeqKey, index);
  //       this.sequence.delete(seqKey);
  //       this.sequence.set(refSeqKey, rule);
  //       this.addToSequenceTriggered(rule, refSeqKey, index);
  //     }
  //   }
  //   else{
  //     if(rule.action == "SEQUENCE"){
  //       this.sequence.set(refSeqKey, rule);
  //       this.sequenceTriggered.set(refSeqKey, [rule]);
  //       this.addToSourceSequenceTriggered(rule, seqKey, refSeqKey, index);
  //     }
  //     else{
  //       if(!rule.isSequenceEnd){
  //         this.addAction(rule, key, index);
  //       }
  //     }
  //   }

  // }

  // validateTriggers(rule:Rule, key:string, index:string){
  //   var seqKey = rule.id.toString();
  //   var refSeqKey = rule.referenceId.toString();

  //   if(rule.action == "SEQUENCE"){
  //     if(this.sequence.has(refSeqKey)){
  //       if(this.sequence.get(refSeqKey).id == rule.id){
  //         this.sequence.delete(refSeqKey);
  //       }
  //     }
  //   }

  //   if(this.triggers.some(x => x == seqKey)){
  //     this.triggers = this.triggers.filter(x => x != seqKey);
  //     this.addAction(rule, key, index, true);
  //     return;
  //   }
   
  //   var actionSequenceTriggered = this.actionSequenceTriggered;
  //   for(var actionSeq of actionSequenceTriggered){
  //     if(actionSeq[1].some(x => x == rule.id.toString())){
  //       var sequencesTriggered = this.sequenceTriggered
  //       for(var sequence of sequencesTriggered){
  //         var ruleArray = sequence[1];
  //         if(ruleArray.some(x => x.id == rule.id)){
  //           var lastRule = ruleArray.pop();
  //           if(lastRule.isSequenceEnd){
  //             var array = actionSeq[0].split("_");
  //             var _index = array.length > 1 ? array[1] : "";
  //             this.addAction(lastRule, key, _index, true);
  //             this.actionSequenceTriggered.delete(_index);
  //           }
  //           this.sequenceTriggered.delete(sequence[0]);
  //         }
  //       }
  //     }
  //   }
  // }

  // addToSequenceTriggered(rule:Rule, seqKey:string, index:string){
  //   var sourceRule = this.sequence.get(seqKey);
  //   for(var sequence of this.sequenceTriggered){
  //     if(sequence[1].some(x => x.id == sourceRule.id)){
  //       sequence[1].push(rule);
  //     }
  //   }
  // }

  // addToSourceSequenceTriggered(rule:Rule, seqKey:string, refSeqKey:string, index:string){
  //   if(this.actionSequenceTriggered.has(seqKey)){
  //     var array = this.actionSequenceTriggered.get(seqKey);
  //     array.push(refSeqKey);
  //     this.actionSequenceTriggered.delete(seqKey);
  //     if(rule.isSequenceEnd){
  //       var actionKey = index == "" ? rule.destinationId.toString() : rule.destinationId + "_" + index;
  //       this.actionSequenceTriggered.set(actionKey, array);
  //     }
  //     else {
  //       this.actionSequenceTriggered.set(refSeqKey, array);
  //     }
  //   }
  //   else {
  //     this.actionSequenceTriggered.set(refSeqKey, [seqKey]);
  //   }
  // }

  // addAction(rule:Rule, key:string, index:string, inversed:boolean = false){
  //   var seqKey = rule.id.toString();
  //   if(!inversed){
  //     if(!this.triggers.some(x => x == seqKey)){
  //       this.triggers.push(seqKey);
  //     }
  //   }
  //   var actionKey = index == "" ? rule.destinationId.toString() : rule.destinationId + "_" + index;
  //   var actualAction = "";
  //   switch(rule.action){
  //     case 'HIDE':
  //       actualAction = inversed ? "SHOW" : "HIDE";
  //       this.actions.push(new Action(actionKey, rule.destinationId, actualAction, rule));
  //       break;
  //     case 'SHOW':
  //       actualAction = inversed ? "HIDE" : "SHOW";
  //       this.actions.push(new Action(actionKey, rule.destinationId, actualAction, rule));
  //       break;
  //     case 'REFERRED':
  //       if(inversed){
  //         this.removeReferred(rule);
  //       }
  //       else{
  //         this.actions.push(new Action(actionKey, rule.destinationId, "REFERRED", rule));
  //       }
  //       break;
  //     case 'EXCLUDED':
  //       if(inversed){
  //         this.removeExcluded(rule);
  //       }
  //       else{
  //         this.actions.push(new Action(actionKey, rule.destinationId, "EXCLUDED", rule));
  //       }
  //       break;
  //     case 'FORCE':
  //       actualAction = inversed ? "UNFORCE" : "FORCE";
  //       this.actions.push(new Action(actionKey, rule.destinationId, actualAction,  rule));
  //     case 'RETRIEVE':
  //       actionKey = index == "" ? rule.questionId.toString() : rule.questionId + "_" + index;
  //       this.actions.push(new Action(actionKey, rule.destinationId, "RETRIEVE",  rule));
  //       break;
  //   }
  // }

  // resetHidden(question:QuestionBase<any>){
  //   if(question.controlType == "reclamation"){
  //     return;
  //   }
  //   if(question){
  //     question.reset();
  //     if(question.parent != undefined && question.parent != null){
  //       question.parent.setInitialValue();
  //     }
  //     this.checkRules(question);
  //   }
  // }

  // addReferred(rule:Rule){
  //   if(!this.referred.has(rule.id)){
  //     this.referred.set(rule.id, rule);
  //   }
  //   this.validateReferred();
  // }

  // removeReferred(rule:Rule){
  //   if(this.referred.has(rule.id)){
  //     this.referred.delete(rule.id);
  //   }
  //   this.validateReferred();
  // }

  // validateReferred(){
  //   this.referredList = [];
  //   this.referred.forEach(r => {
  //     this.referredList.push(r);
  //   });
  //   this.isReferred.next(this.referred.size > 0);
  // }

  // addExcluded(rule:Rule){
  //   if(!this.excluded.has(rule.id)){
  //     this.excluded.set(rule.id, rule);
  //   }
  //   this.validateExcluded();
  // }

  // removeExcluded(rule:Rule){
  //   if(this.excluded.has(rule.id)){
  //     this.excluded.delete(rule.id);
  //   }
  //   this.validateExcluded();
  // }

  // validateExcluded():void{
  //   this.excludedList = [];
  //   this.excluded.forEach(e => {
  //     this.excludedList.push(e);
  //   });
  //   this.isExcluded.next(this.excluded.size > 0);
  // }

  // updateReferredExcluded(exclusions:QuoteExclusion[]){
  //   for(var exclusion of exclusions){
  //     if(exclusion.isExcluded){
  //       if(!this.excluded.has(exclusion.ruleId))
  //         this.excluded.set(exclusion.ruleId, exclusion.rule);
  //     }
  //     if(exclusion.isReferred){
  //       if(!this.referred.has(exclusion.ruleId))
  //         this.referred.set(exclusion.ruleId, exclusion.rule);
  //     }
  //   }
  //   this.referredList = [];
  //   this.referred.forEach(r => {
  //     this.referredList.push(r);
  //   });
  //   this.excludedList = [];
  //   this.excluded.forEach(e => {
  //     this.excludedList.push(e);
  //   });
  //   this.isReferred.next(this.referred.size > 0);
  //   this.isExcluded.next(this.excluded.size > 0);
  // }

  // contains(value1:any, value2:any, notContains:boolean = false){
  //   if(Array.isArray(value1)){
  //     var index = value1.indexOf(value2);
  //     return notContains ? index == -1 : index > -1;
  //   }
  //   var reg = new RegExp(value2, "gi");
  //   return notContains ? value1.toString().search(reg) == -1 : value1.toString().search(reg) >= 0;
  // }

  // isEmpty(value1:any, isNotEmpty:boolean = false){
  //   if(Array.isArray(value1)){
  //     return isNotEmpty ? value1.every(x => x != '') : value1.every(x => x == '');
  //   }
  //   return isNotEmpty ? value1 != '' : value1 == '';
  // }

  // claimsRules(claims:Reclamation[], valueToCompare:string, type:string, andEqual:boolean = false):boolean{
  //   if(claims == null){
  //     claims = [];
  //   }
  //   if(type == 'co'){
  //     return valueToCompare == claims.length.toString();
  //   }
  //   for(var claim of claims){
  //     var amount = parseFloat(claim['amount'].toString().replace(",",".").replace(/\s/g, ""));
  //     var reserve = parseFloat(claim['reserve'].toString().replace(",",".").replace(/\s/g, ""));
  //     var total = amount + reserve;
  //     var compareTo = parseFloat(valueToCompare.replace(",", ".").replace(/\s/g, ""));
  //     switch(type){
  //       case 'gt':
  //         if(andEqual ? total >= compareTo : total > compareTo){
  //           return true;
  //         }
  //         break;
  //       case 'lt':
  //         if(andEqual ? total <= compareTo : total < compareTo){
  //           return true;
  //         }
  //         break;
  //       case 'eq':
  //         if(total == compareTo)
  //           return true;
  //         break;
  //       case 'op':
  //         if(claim['opened'].toString() == valueToCompare){
  //           return true;
  //         }
  //         break;
  //     }
  //   }
  //   return false;
  // }

  // isGreaterThan(value1:string, value2:string, andEqual:boolean = false):boolean{
  //   if(isNullOrUndefined(value1) || isNullOrUndefined(value2)){
  //     return false;
  //   }
  //   var number1 = parseFloat(value1.toString().replace(",",".").replace(/\s/g, ""));
  //   var number2 = parseFloat(value2.toString().replace(",",".").replace(/\s/g, ""));
  //   if(isNaN(number1) || isNaN(number2)){
  //     return false;
  //   }
  //   return andEqual ? number1 >= number2 : number1 > number2;
  // }

  // isLesserThan(value1:string, value2:string, andEqual:boolean = false):boolean{
  //   if(isNullOrUndefined(value1) || isNullOrUndefined(value2)){
  //     return false;
  //   }
  //   var number1 = parseFloat(value1.toString().replace(",",".").replace(/\s/g, ""));
  //   var number2 = parseFloat(value2.toString().replace(",",".").replace(/\s/g, ""));
  //   if(isNaN(number1) || isNaN(number2)){
  //     return false;
  //   }
  //   return andEqual ? number1 <= number2 : number1 < number2;
  // }
  
  // dateGreaterThan(value1:string, value2:string, andEqual:boolean = false):boolean {
  //   if(isNullOrUndefined(value1) || isNullOrUndefined(value2)){
  //     return false;
  //   }
  //   var array1 = value1.split('-');
  //   var date1 = moment([Number.parseInt(array1[2]), Number.parseInt(array1[1]) - 1, Number.parseInt(array1[0])])
  //   var date2 = getNowPlusMinusDate(value2);
  //   return andEqual ? date1 >= date2 : date1 > date2;
  // }

  // dateLesserThan(value1:string, value2:string, andEqual:boolean = false):boolean{
  //   if(isNullOrUndefined(value1) || isNullOrUndefined(value2)){
  //     return false;
  //   }
  //   var array1 = value1.split('-');
  //   var date1 = moment([Number.parseInt(array1[2]), Number.parseInt(array1[1]) - 1, Number.parseInt(array1[0])])
  //   var date2 = getNowPlusMinusDate(value2);
  //   return andEqual ? date1 <= date2 : date1 < date2;
  // }

  // yearGreaterThan(value1:any, value2:string, andEqual:boolean = false):boolean{
  //   if(isNullOrUndefined(value1) || isNullOrUndefined(value2)){
  //     return false;
  //   }
  //   try {
  //     var year2 = getNowPlusMinus('year', value2);
  //     var year1 = 0;
  //     if(Array.isArray(value1)){
  //       var result = [];
  //       for(var val of value1){
  //         year1 = 0;
  //         try {
  //           year1 = Number.parseInt(val);
  //         }
  //         catch{}
  //         result.push(andEqual ? year1 >= year2 : year1 > year2);
  //       }
  //       return result.every(x => x);
  //     }
  //     else {
  //       try {
  //         year1 = Number.parseInt(value1);
  //       }
  //       catch{}
  //       return andEqual ? year1 >= year2 : year1 > year2;
  //     }
  //   }
  //   catch{
  //     return false;
  //   }
  // }

  // yearLesserThan(value1:any, value2:string, andEqual:boolean = false):boolean{
  //   if(isNullOrUndefined(value1) || isNullOrUndefined(value2)){
  //     return false;
  //   }
  //   try {
  //     var year2 = getNowPlusMinus('year', value2);
  //     if(Array.isArray(value1)){
  //       var result = [];
  //       for(var val of value1){
  //         year1 = 0;
  //         try {
  //           if(val != ""){
  //             year1 = Number.parseInt(val);
  //           }
  //         }
  //         catch{}
  //         result.push(andEqual ? year1 <= year2 : year1 < year2);
  //       }
  //       return result.every(x => x);
  //     }
  //     else {
  //       var year1 = Number.parseInt(value1);
  //       return andEqual ? year1 <= year2 : year1 < year2;
  //     }
  //   }
  //   catch{
  //     return false;
  //   }
  // }

  // provinceIs(ruleValue, questionValue, isNot:boolean = false){
  //   var result = false;
  //   for(var key in questionValue){
  //     if(key.indexOf("province") > -1){
  //       if(questionValue[key] == ""){
  //         break;
  //       }
  //       result = isNot ? questionValue[key] != ruleValue : questionValue[key] == ruleValue;
  //     }
  //     if(result)
  //       break;
  //   }
  //   return result;
  // }

  // saveExclusions(quoteId:string):Observable<void>{
  //   var exclusion = [];
  //   this.excludedList.forEach(x => exclusion.push({quoteId:quoteId, ruleId: x.id, reasonId:x.excludedReferredReasonId, isExcluded:true, isReferred:false}));
  //   this.referredList.forEach(x => exclusion.push({quoteId:quoteId, ruleId: x.id, reasonId:x.excludedReferredReasonId, isExcluded:false, isReferred:true}));
  //   var body = JSON.stringify(exclusion);
  //   return this.http.put<void>(`${environment.apiURL}/api/quote/exclusion/` + quoteId, body, {
  //     headers:{'Content-Type': 'application/json' }
  //   });
  // }
}
