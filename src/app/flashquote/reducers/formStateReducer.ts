import {
  addGroupControl,
  createFormGroupState,
  formGroupReducer,
  FormGroupState,
  removeGroupControl,
  StateUpdateFns,
  updateGroup,
  validate,
  AddArrayControlAction,
  addArrayControl,
  updateArray,
  removeArrayControl
} from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { FormValue, SectionControl } from '../store';
import { AddGroupSectionAction, CreateGroupElementAction, RemoveGroupElementAction, RemoveGroupSectionAction } from '../actions/flashquote.actions';
import { setValue, ValidationErrors } from 'ngrx-forms/public_api';
import { Section } from '../models/Section';
import { cloneDeep } from 'lodash';


/* INTIAL STATE */
/* *** *** ***  *** *** ***  *** *** ***  *** *** *** */
export const FORM_ID = 'generic';
export const INITIAL_STATE = createFormGroupState<FormValue>(FORM_ID, {
});


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

// export const validateForm = (s: FormGroupState<any> = INITIAL_STATE) => {
//   console.log('controls', s.controls)
//   const updateFns = Object.keys(s.controls).reduce(
//     (fns, key) => {
//       return {
//         ...fns,
//         [key]: key == "2885" || key == "257" ? validate(validateRepartition) : validate(required)
//       }
//     },
//     {} as StateUpdateFns<typeof s.value>
//   );
//   return updateGroup(s, updateFns);
// };

// export const validateAndUpdateForm = updateGroup<any>({
//   35: validate(required),
// })


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

export function resetSectionValue(sectionValue: any) {
  let initial = { ...sectionValue }

  // for (let key in initial) {
  //   console.log('val', initial[key])
  //   if (initial[key] === 'false' || initial[key] === 'true') {
  //     initial[key] = 'false'
  //   }
  // }


  // console.log('INITIAL', initial)
  return initial
}


/* REDUCER */
/* *** *** ***  *** *** ***  *** *** ***  *** *** *** */
export function formStateReducer(
  state = INITIAL_STATE, action: AddGroupSectionAction | RemoveGroupSectionAction
) {
  const validateForm = updateGroup<FormValue>({
    34: updateArray(updateGroup<SectionControl>({
      223: validate(required),
      227: updateGroup<any>({
        'MailingAddress-Street': validate(required),
        'MailingAddress-PostalCode': validate(required),
        'MailingAddress-City': validate(required),
        'MailingAddress-StreetNumber': validate(required),
        'MailingAddress-Province': validate(required)
      }),
      246: validate(required),
      248: validate(required),
      249: validate(required),
      250: validate(required),
      251: validate(required),
      254: validate(required),
      308: validate(required)
    })),
    35: updateArray(updateGroup<SectionControl>({
      226: validate(required),
      238: validate(required),
      239: validate(required),
      264: validate(required),
      268: validate(required),
      270: validate(required),
      289: updateGroup<any>({
        firstName: validate(required),
        lastName: validate(required)
      })
    })),
    36: updateArray(updateGroup<SectionControl>({
      235: validate(required),
     // 257: validate(validateRepartition),
      259: validate(required),
      262: validate(required),
      275: validate(required),
      276: validate(required),
      284: validate(required),
      294: validate(required),
      295: validate(required),
      297: validate(required),
      298: validate(required),
      299: validate(required),

    }))
  })

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
