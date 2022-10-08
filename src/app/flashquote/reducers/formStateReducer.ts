import {
  createFormGroupState,
  formGroupReducer,
  updateGroup,
  addArrayControl,
  removeArrayControl
} from 'ngrx-forms';
import { FormValue } from '../store';
import { AddGroupSectionAction, RemoveGroupSectionAction } from '../actions/flashquote.actions';
import { cloneDeep } from 'lodash';
import { validation } from '../validation/rules';


/* INTIAL STATE */
/* *** *** ***  *** *** ***  *** *** ***  *** *** *** */
export const FORM_ID = 'generic';
export const INITIAL_STATE = createFormGroupState<FormValue>(FORM_ID, {});


/* REDUCER */
/* *** *** ***  *** *** ***  *** *** ***  *** *** *** */
export function formStateReducer(
  state = INITIAL_STATE, action: AddGroupSectionAction | RemoveGroupSectionAction
) {
  
  const marketId = localStorage.getItem('market') ?? ''
  const validateForm = updateGroup<FormValue>(validation[marketId])

  switch (action.type) {
    case AddGroupSectionAction.TYPE:
      state = updateGroup<FormValue>(state, {
        [action.sectionId]: section => {
          // reset form before adding it
          const sectionClone = cloneDeep(section)
          let initialSectionValue: any = sectionClone.value[0]

          for (let key in initialSectionValue) {
            if (typeof initialSectionValue[key] === 'object') {
              for (let nestedKey in initialSectionValue[key]) {
                initialSectionValue[key][nestedKey] = "";
              }
            }

            if (typeof initialSectionValue[key] === 'string') {
              if (initialSectionValue[key] === 'false' || initialSectionValue[key] === 'true') {
                initialSectionValue[key] = "false";
              }
              else initialSectionValue[key] = "";
            }
          }
          return addArrayControl(initialSectionValue)(section)
        }
      })
      break;

    case RemoveGroupSectionAction.TYPE:
      state = updateGroup<FormValue>(state, {
        [action.sectionId]: section => {
          return removeArrayControl(action.index)(section)
        }
      })
      break;
  }

  return validateForm(formGroupReducer(state, action))
}





// /* REDUCER */
// /* *** *** ***  *** *** ***  *** *** ***  *** *** *** */
// export function formStateReducer(
//   s: FormGroupState<FormValue> = INITIAL_STATE,
//   a: CreateGroupElementAction
//     | RemoveGroupElementAction | AddArrayControlAction<any>
// ) {
//   switch (a.type) {
//     //https://giters.com/MrWolfZ/ngrx-forms/issues/87

//     case RemoveGroupElementAction.TYPE:
//       const newS = updateGroup<FormValue>({
//         [a.destinationId]: (group: any) => {
//           return removeGroupControl(group, a.responseKey as never);
//         },
//       })(s);
//       return formGroupReducer(newS, a);

//     case CreateGroupElementAction.TYPE:
//       const value = s.controls[a.destinationId].value as {};
//       if (!(a.responseKey in value)) {
//         // newS = the whole formState
//         const newS = updateGroup<FormValue>({
//           [a.destinationId]: (group: any) => {
//             // group = nested repartition
//             return addGroupControl(group, a.responseKey, '')
//           }
//         })(s);
//         return formGroupReducer(newS, a);
//       }
//   }

//   return validateForm(formGroupReducer(s, a));
//   //return validateAndUpdateForm(formGroupReducer(s, a));
// }