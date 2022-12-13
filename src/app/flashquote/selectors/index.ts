import { BrowserTransferStateModule } from '@angular/platform-browser';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { brokerReducer } from '../reducers/brokerReducer';
import { State } from '../store';

// Feature selector
export const selectForm = createFeatureSelector<State['form']>('form');

// selectors
export const selectUi = createSelector(
  selectForm,
  (state) => state.ui
);

export const selectBroker = createSelector(
  selectForm,
  (state) => state.broker
);

export const selectActiveSection = createSelector(
  selectForm,
  (state) => state.activeSection
)

export const selectSections = createSelector(
  selectForm,
  (state) => state.sections
);

export const selectAllSectionsLoaded = createSelector(
  selectForm,
  (state) => !!state.sections
);

export const selectFormState = createSelector(
  selectForm,
  (state) => state.formState
);

export const selectPrime = createSelector(
  selectForm,
  (state) => state.prime
)

export const selectExclusions = createSelector(
  selectForm,
  (state) => state.exclusions
);

export const selectFormValid = createSelector(
  selectForm,
  (state) => state.formState.isValid
);

export const selectFormSubmitted = createSelector(
  selectForm,
  (state) => state.formState.isSubmitted
);

export const selectSubmittedValue = createSelector(
  selectForm,
  (state) => state.submittedValue
);

export const selectErrors = createSelector(
  selectFormState,
  (state) => state.errors
);

export const selectStyles = createSelector(
  selectForm,
  (state) => state.broker.styles
)

export const selectProgress = createSelector(
  selectErrors,
  (state) => {
    let count = 0
    for (let i in state) {
      for (let j in state[i]) {
        count += Object.keys(state[i][j]).length
      }
    }
    return count
  }
)
