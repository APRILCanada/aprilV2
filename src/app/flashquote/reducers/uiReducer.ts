import { createReducer, on } from '@ngrx/store';
import { formLoaded } from '../actions/flashquote.actions';


const initialState = {
    isFormLoaded: false
};

export const uiReducer = createReducer(
    initialState,
    on(formLoaded, (state, { isFormLoaded }) => ({ ...state, isFormLoaded }))
);