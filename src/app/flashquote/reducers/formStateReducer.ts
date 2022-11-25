import {
  createFormGroupState,
  formGroupReducer,
  updateGroup,
  addArrayControl,
  removeArrayControl,
  removeGroupControl,
  addGroupControl,
  updateArray
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
      const p = action.pathToGroup.split('.')
      const sId = parseInt(p[1])
      const gId = parseInt(p[2])
      const contrl = (state.controls[sId].controls[gId].controls as any)[action.destinationId];

      if (contrl && (action.responseKey in contrl.value)) {
        state = updateGroup<FormValue>(state, {
          [sId]: updateArray(
            updateGroup({
              [action.destinationId]: (group: any) => {
                return removeGroupControl(group, action.responseKey as never)
              },
            })
          ),
        })
      }
      break;


    case CreateGroupElementAction.TYPE:
      const path = action.pathToGroup.split('.')
      const sectionId = parseInt(path[1])
      const groupId = parseInt(path[2])

      const control = (state.controls[sectionId].controls[groupId].controls as any)[action.destinationId];
      if (control && !(action.responseKey in control.value)) {
        state = updateGroup<FormValue>(state, {
          [sectionId]: updateArray(
            updateGroup({
              [action.destinationId]: (group: any) => {
                return addGroupControl(group, action.responseKey, '')
              },
            })
          ),
        })
      }
      break;
  }

  return validateForm(formGroupReducer(state, action))
}