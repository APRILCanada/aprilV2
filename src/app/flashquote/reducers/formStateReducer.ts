import {
  createFormGroupState,
  formGroupReducer,
  updateGroup,
  addArrayControl,
  removeArrayControl,
  removeGroupControl,
  addGroupControl
} from 'ngrx-forms';
import { FormValue } from '../store';
import { AddGroupSectionAction, CreateGroupElementAction, RemoveGroupElementAction, RemoveGroupSectionAction } from '../actions/flashquote.actions';
import { cloneDeep } from 'lodash';
import { validation } from '../validation/rules';


/* INTIAL STATE */
/* *** *** ***  *** *** ***  *** *** ***  *** *** *** */
export const FORM_ID = 'generic';
export const INITIAL_STATE = createFormGroupState<FormValue>(FORM_ID, {});


/* REDUCER */
/* *** *** ***  *** *** ***  *** *** ***  *** *** *** */
export function formStateReducer(
  state = INITIAL_STATE, action: AddGroupSectionAction | RemoveGroupSectionAction | CreateGroupElementAction | RemoveGroupElementAction
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
              initialSectionValue[key] = "";
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

    case RemoveGroupElementAction.TYPE:
      state = updateGroup<FormValue>(state, {
        [action.destinationId]: (group: any) => {
          return removeGroupControl(group, action.responseKey as never);
        },
      })
      break;


    case CreateGroupElementAction.TYPE:
      console.log('STATE', state)
      const path = action.pathToGroup.split('.')
      const sectionId = parseInt(path[1])
      const groupId = parseInt(path[2])
      //const value = state.controls[action.destinationId].value as {};
     // const value = (state.controls[sectionId].controls[groupId].controls as any)[action.destinationId]?.value as {}

       // if (!(action.responseKey in value)) {
          state = updateGroup<FormValue>(state, {
            [action.destinationId]: (group: any) => {
              console.log('GROUP', group)
              // group = nested repartition
              return addGroupControl(group, action.responseKey, '')
            }
          });
          break
       // }

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