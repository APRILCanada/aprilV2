import { Injectable } from '@angular/core';
import { Store,  select } from '@ngrx/store';
import { State } from '../store';
import { BrokerDTO } from '../models/Broker';
import { selectBroker } from '../selectors';

@Injectable({
  providedIn: 'root'
})
export class RequestAonService {
  broker: BrokerDTO;
  apiKey: string;
  constructor(private store: Store<State>,) { }

  public getApiKey (): string {
    this.store.pipe(select(selectBroker)).subscribe(broker => {
      this.apiKey = broker.aprilonId
    })
    return this.apiKey;
  }
}
