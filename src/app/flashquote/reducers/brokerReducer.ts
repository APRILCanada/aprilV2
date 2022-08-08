import { createReducer, on } from '@ngrx/store';
import { loadBrokerSuccess } from '../actions/broker.actions';


const initialState = {};

export const brokerReducer = createReducer(
  initialState,
  on(loadBrokerSuccess, (state, {broker}) => ({ ...state, ...broker}))
);