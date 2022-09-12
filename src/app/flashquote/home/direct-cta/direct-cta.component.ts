import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectBroker } from '../../selectors';
import { State } from '../../store';

@Component({
  selector: 'app-direct-cta',
  templateUrl: './direct-cta.component.html',
  styleUrls: ['./direct-cta.component.scss']
})
export class DirectCtaComponent implements OnInit {

  broker: any;
  constructor(private store: Store<State>,) { }

  ngOnInit(): void {
    this.getBroker()
  }

  getBroker() {
    this.store.pipe(select(selectBroker)).subscribe(broker => {
      this.broker = broker
    })
  }

}
