import { Action, createAction, props } from '@ngrx/store';
import { create } from 'lodash';
import { FormControlState } from 'ngrx-forms';
import { number } from 'ngrx-forms/validation';
import { ActiveSection } from '../models/ActiveSection';
import { FlashFormDTO } from '../models/Flashquote';
import { Label } from '../models/Label';

// QUESTIONS
// export const loadQuestions = createAction('[QUESTIONS] Load Questions', props<{ marketId: string }>());
// export const loadQuestionsSuccess = createAction('[QUESTIONS] Load Questions Success', props<{ flashquote: FlashFormDTO }>());
// export const loadQuestionsError = createAction('[QUESTIONS] Load Questions Error');

// SECTIONS
export const loadSections = createAction('[SECTIONS] Load Sections', props<{ marketId: string }>());
export const loadSectionsSuccess = createAction('[SECTIONS] Load Sections Success', props<{ flashquote: FlashFormDTO }>());
export const loadSectionsError = createAction('[SECTIONS] Load Sections Error');
export const setActiveSection = createAction('[SECTIONS] Set Active Section', props<{ activeSection: ActiveSection }>())

export const createSections = createAction('[SECTIONS] Create sections', props<{ flashquote: FlashFormDTO }>())
export const loadForm = createAction('[FORM] Load Form', props<{ flashquote: FlashFormDTO }>())
// export const loadFlashquote = createAction(
//   '[Home Resolver] LOAD_FLASHQUOTE',
//   props<{ marketId: string }>()
// );
export const formLoaded = createAction('[FORM] Form Loaded', props<{ isFormLoaded: boolean }>())

export const setPrime = createAction('[FORM] Set Prime', props<{ marketId: string, formValue: any, prime: any }>())

export const setExclusions = createAction('[FORM] Set Exclusions', props<{ exclusions: string[] }>())

export const setValue = createAction(
  '[Dialog Set Value] Set Selected Value',
  props<{ control: FormControlState<any>; selectedOptions: string }>()
);

export const retrieveOptionsAction = createAction(
  '[FORM] Retrieve Options', props<{ sectionId: number, questionId: number, option: string }>()
);

export class SetSubmittedValueAction implements Action {
  static readonly TYPE = 'form/SET_SUBMITTED_VALUE';
  readonly type = SetSubmittedValueAction.TYPE;
  constructor(public submittedValue: any) { }
}

export class FlashquoteLoadedAction implements Action {
  static readonly TYPE = 'form/FLASHQUOTE_LOADED';
  readonly type = FlashquoteLoadedAction.TYPE;
  constructor(public name: string, public flashquote: FlashFormDTO) { }
}

export class CreateGroupElementAction implements Action {
  static readonly TYPE = 'form/CREATE_GROUP_ELEMENT';
  readonly type = CreateGroupElementAction.TYPE;
  constructor(public responseKey: any, public destinationId: any, public pathToGroup: string) { }
}

export class RemoveGroupElementAction implements Action {
  static readonly TYPE = 'form/REMOVE_GROUP_ELEMENT';
  readonly type = RemoveGroupElementAction.TYPE;
  constructor(public responseKey: any, public destinationId: any,  public pathToGroup: string) { }
}

export class AddGroupSectionAction implements Action {
  static readonly TYPE = 'form/ADD_GROUP_SECTION';
  readonly type = AddGroupSectionAction.TYPE;
  constructor(public sectionId: any) { }
}

export class RemoveGroupSectionAction implements Action {
  static readonly TYPE = 'form/REMOVE_GROUP_SECTION';
  readonly type = RemoveGroupSectionAction.TYPE;
  constructor(public sectionId: any, public index: number) { }
}
