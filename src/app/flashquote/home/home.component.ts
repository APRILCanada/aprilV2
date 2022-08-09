import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectBroker, selectFormSubmitted, selectFormValid } from '../selectors';
import { State } from '../store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  flashFormDTO: any;
  formSubmitted$: Observable<boolean>;
  formValid$: Observable<boolean>;
  broker: any;
  load = false;

  constructor(private route: ActivatedRoute, private store: Store<State>,) { }

  ngOnInit(): void {
    this.getFormSubmitted()
    this.getFormValid()
    this.getBroker()
  }


  getBroker() {
    this.store.pipe(select(selectBroker)).subscribe(broker => {
      this.broker = broker
    })
  }

  getFormSubmitted() {
    this.formSubmitted$ = this.store.pipe(select(selectFormSubmitted));
  }

  getFormValid() {
    this.formValid$ = this.store.pipe(select(selectFormValid));
  }
}
