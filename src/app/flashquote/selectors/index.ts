import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../store';

// Feature selector
export const selectForm = createFeatureSelector<State['form']>('form');

// selectors
export const selectQuestions = createSelector(
  selectForm,
  (state) => state.questions
);

export const selectAllQuestionsLoaded = createSelector(
  selectForm,
  (state) => !!state.questions
);

export const selectFormState = createSelector(
  selectForm,
  (state) => state.formState
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
