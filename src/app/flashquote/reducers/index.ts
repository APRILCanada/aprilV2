import { Action, combineReducers } from "@ngrx/store";
import { FormValue, State } from "../store";
import { SetSubmittedValueAction } from "../actions/flashquote.actions";
import { sectionsReducer } from "./sectionsReducer";
import { formStateReducer } from "./formStateReducer";
import { brokerReducer } from "./brokerReducer";
import { uiReducer } from "./uiReducer"
import { activeSectionReducer } from "./activeSectionReducer";

const reducers = combineReducers<State['form'], any>({
  broker: brokerReducer,
  ui: uiReducer,
  activeSection: activeSectionReducer,
  sections: sectionsReducer,
  formState: formStateReducer,
  submittedValue(s: FormValue | undefined, a: SetSubmittedValueAction) {
    switch (a.type) {
      case SetSubmittedValueAction.TYPE:
        return a.submittedValue;

      default:
        return s;
    }
  },
});

export function reducer(s: State['form'], a: Action) {
  return reducers(s, a);
}