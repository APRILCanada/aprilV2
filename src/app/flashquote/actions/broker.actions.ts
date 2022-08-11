import { createAction, props } from '@ngrx/store';
import { BrokerDTO } from '../models/Broker';


export const loadBroker = createAction('[BROKER] Load Broker', props<{ id: string }>());
export const loadBrokerSuccess = createAction('[BROKER] Load Broker Success', props<{ broker: BrokerDTO }>());
export const loadBrokerError = createAction('[BROKER] Load Broker Error');