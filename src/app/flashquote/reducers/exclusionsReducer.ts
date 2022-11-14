import { createReducer, on } from '@ngrx/store';
import { setExclusions } from '../actions/flashquote.actions';

const initialState: string[] = [];

export const exclusionsReducer = createReducer(
  initialState,
  on(setExclusions, (state, { exclusions }) => exclusions)
);