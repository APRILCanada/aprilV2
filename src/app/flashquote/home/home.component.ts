import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFormSubmitted, selectFormValid, selectMarketId } from '../selectors';
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
  marketId: string;

  constructor(private route: ActivatedRoute, private store: Store<State>,) { }

  ngOnInit(): void {
    this.getFormSubmitted()
    this.getFormValid()
    this.getMarketId()
  }


  getMarketId() {
    this.store.pipe(select(selectMarketId)).subscribe(marketId => {
      this.marketId = marketId
    })
  }

  getFormSubmitted() {
    this.formSubmitted$ = this.store.pipe(select(selectFormSubmitted));
  }

  getFormValid() {
    this.formValid$ = this.store.pipe(select(selectFormValid));
  }
}
