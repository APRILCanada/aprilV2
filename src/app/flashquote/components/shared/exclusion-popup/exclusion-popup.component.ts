import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BrokerDTO } from 'src/app/flashquote/models/Broker';
import { selectBroker } from 'src/app/flashquote/selectors';
import { State } from 'src/app/flashquote/store';

@Component({
  selector: 'app-exclusion-popup',
  templateUrl: './exclusion-popup.component.html',
  styleUrls: ['./exclusion-popup.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '250ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(
          '250ms ease-in-out',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        )
      ])
    ])
  ]
})
export class ExclusionPopupComponent implements OnInit {
  @Input() error: any;
  broker: BrokerDTO;

  constructor(public translate: TranslateService, private store: Store<State>) { }

  ngOnInit(): void {
    this.getBroker()
  }

  getBroker() {
    this.store.pipe(select(selectBroker)).subscribe(broker => {
      this.broker = broker
    })
  }
}