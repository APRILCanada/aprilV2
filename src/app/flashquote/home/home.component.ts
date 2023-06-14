import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, finalize, map, tap } from 'rxjs';
import { selectBroker, selectFormSubmitted, selectFormValid, selectUi } from '../selectors';
import { State } from '../store';
import { LanguageService } from 'src/app/services/language.service';

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
  currentRoute: string;
  starting: boolean = true;

  constructor(private route: ActivatedRoute, private store: Store<State>, private language: LanguageService) { }

  ngOnInit(): void {
    setTimeout(()=>{this.starting = false},2000)
    this.route.params.pipe(map(route => this.currentRoute = route['id'])).subscribe()
    this.getUi()
    this.getFormSubmitted()
    this.getFormValid()
    this.getBroker()
  }



  getBroker() {
    this.store.pipe(
      select(selectBroker), 
      tap(broker => {
        if(broker.defaultLang)this.language.set(broker.defaultLang)
      })
    )
    .subscribe(broker => {
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
