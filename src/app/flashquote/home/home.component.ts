import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFormSubmitted, selectFormValid } from '../selectors';
import { State } from '../store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  marketId: string | null;
  flashFormDTO: any;
  formSubmitted$: Observable<boolean>;
  formValid$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<State>,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.marketId = params.get('marketId');
    });

    this.getFormSubmitted()
    this.getFormValid()
  }

  getFlashFormDTO(marketId: string) {

  }

  getFormSubmitted() {
    this.formSubmitted$ = this.store.pipe(select(selectFormSubmitted));
  }

  getFormValid() {
    this.formValid$ = this.store.pipe(select(selectFormValid));
  }
}
