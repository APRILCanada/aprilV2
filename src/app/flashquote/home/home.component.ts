import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectBroker, selectFormSubmitted, selectFormValid, selectUi } from '../selectors';
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
  ui$: Observable<any>;
  broker: any;
  load = false;
  logo: string;

  constructor(private route: ActivatedRoute, private store: Store<State>,) { }

  ngOnInit(): void {
    this.getUi()
    this.getFormSubmitted()
    this.getFormValid()
    this.getBroker()
  }



  getBroker() {
    this.store.pipe(select(selectBroker)).subscribe(broker => {
      this.broker = broker
      this.logo = encodeURIComponent(broker.logo)
    })
  }

  getFormSubmitted() {
    this.formSubmitted$ = this.store.pipe(select(selectFormSubmitted));
  }

  getFormValid() {
    this.formValid$ = this.store.pipe(select(selectFormValid));
  }

  getUi() {
    this.ui$ = this.store.pipe(select(selectUi));
  }
}
