import {
  addGroupControl,
  AddGroupControlAction,
  createFormGroupState,
  formGroupReducer,
  FormGroupState,
  removeGroupControl,
  StateUpdateFns,
  updateGroup,
  validate,
} from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { FormValue } from '../store';
import { CreateGroupElementAction, RemoveGroupElementAction } from '../actions/flashquote.actions';
import { ValidationErrors } from 'ngrx-forms/public_api';

/* INTIAL STATE */
/* *** *** ***  *** *** ***  *** *** ***  *** *** *** */
export const FORM_ID = 'contracteur_v2';
export const INITIAL_STATE = createFormGroupState<FormValue>(FORM_ID, {});


/* VALIDATION */
/* *** *** ***  *** *** ***  *** *** ***  *** *** *** */
export function validateRepartition(values: any): ValidationErrors {
  let total = 0;
  let unfilledValues = false

  for (let k in values) {
    if (values[k] === 0 || values[k] === null) unfilledValues = true
    total += values[k]
  }

  return total === 100 && unfilledValues ? {
    unfilledRepartition: {
      actual: ""
    }
  } : (total === 100 && !unfilledValues) || Object.entries(values).length === 0 ? {} : {
    valRep: {
      actual: total
    }
  }
}

export const validateForm = (s: FormGroupState<any> = INITIAL_STATE) => {
  const updateFns = Object.keys(s.controls).reduce(
    (fns, key) => {
      return {
        ...fns,
        [key]: key == "2885" ? validate(validateRepartition) : validate(required)
      }
    },
    {} as StateUpdateFns<typeof s.value>
  );
  return updateGroup(s, updateFns);
};


/* REDUCER */
/* *** *** ***  *** *** ***  *** *** ***  *** *** *** */
export function formStateReducer(
  s: FormGroupState<any> = INITIAL_STATE,
  a:
    | AddGroupControlAction<any>
    | CreateGroupElementAction
    | RemoveGroupElementAction
) {
  switch (a.type) {
    case RemoveGroupElementAction.TYPE:
      const newS = updateGroup<FormValue>({
        [a.destinationId]: (group: any) => {
          return removeGroupControl(group, a.responseKey);
        },
      })(s);
      return formGroupReducer(newS, a);

    case CreateGroupElementAction.TYPE:
      const value = s.controls[a.destinationId].value as {};
      if (!(a.responseKey in value)) {
        // newS = the whole formState
        const newS = updateGroup<FormValue>({
          [a.destinationId]: (group: any) => {
            // group = nested repartition
            return addGroupControl(group, a.responseKey, 0)
          }
        })(s);
        return formGroupReducer(newS, a);
      }
  }
  return validateForm(formGroupReducer(s, a));
}
