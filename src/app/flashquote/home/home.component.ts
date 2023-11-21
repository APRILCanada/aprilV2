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
  scullyBuffer: boolean = true;

  constructor(private route: ActivatedRoute, private store: Store<State>, private language: LanguageService) { 

  }


  ngOnInit(): void {
    setTimeout(()=>{ 
      let container = document.getElementById('loadingContainer')
      if(container) {
        container.classList.add('d-none');
      };
    },1500)
    this.route.params.pipe(tap(route => {
      this.currentRoute = route['id'];
      let script = document.createElement("script");
      script.type="text/javascript";
      if(this.currentRoute.includes('gc-assurances')){
        script.innerHTML=`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-N9SRWDX')`;
        document.getElementsByTagName('head')[0].appendChild(script);
      }
      if(this.currentRoute.includes('gaudreau')){
        script.innerHTML=`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KFW43Z8')`;
        document.getElementsByTagName('head')[0].appendChild(script);

      }
    })).subscribe()
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
