import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { LanguageService } from 'src/app/services/language.service';
import { selectBroker } from '../../selectors';
import { PageService } from '../../services/page.service';
import { ProvinceService } from '../../services/province.service';
import { State } from '../../store';


@Component({
  selector: 'app-flash-quote',
  templateUrl: './flash-quote.component.html',
  styleUrls: ['./flash-quote.component.scss'],
})
export class FlashQuoteComponent implements OnInit {
  @Input() id: string;
  broker: any;
  logo: string;

  constructor(
    public language: LanguageService,
    public page: PageService,
    private route: ActivatedRoute,
    public prov: ProvinceService,
    private store: Store<State>,
  ) {}

  ngOnInit(): void {
    this.getBroker()
  }

  getBroker() {
    this.store.pipe(select(selectBroker)).subscribe(broker => {
      console.log('broker', broker)
      this.broker = broker
      this.logo = encodeURIComponent(broker.logo)
    })
  }
}
