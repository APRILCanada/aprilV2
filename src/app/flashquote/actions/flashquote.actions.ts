import { Action, createAction, props } from '@ngrx/store';
import { FormControlState } from 'ngrx-forms';
import { FlashFormDTO } from '../models/Flashquote';

export const loadFlashquote = createAction(
  '[Home Resolver] LOAD_FLASHQUOTE',
  props<{ marketId: string }>()
);

export const flashquoteLoaded = createAction(
  '[Load Flashform Effect] FLASHQUOTE_LOADED',
  props<{ flashquote: FlashFormDTO }>()
);

export const setValue = createAction(
  '[Dialog Set Value] Set Selected Value',
  props<{ control: FormControlState<any>; selectedOptions: string }>()
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
  constructor(public responseKey: any, public destinationId: any) { }
}

export class RemoveGroupElementAction implements Action {
  static readonly TYPE = 'form/REMOVE_GROUP_ELEMENT';
  readonly type = RemoveGroupElementAction.TYPE;
  constructor(public responseKey: any, public destinationId: any) { }
}
