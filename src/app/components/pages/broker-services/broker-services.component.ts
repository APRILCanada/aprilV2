import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';

declare global {
  interface Window {
    dataLayer: any;
  }
}

@Component({
  selector: 'app-broker-services',
  templateUrl: './broker-services.component.html',
  styleUrls: ['./broker-services.component.scss'],
})
export class BrokerServicesComponent implements OnInit, AfterContentInit {
  constructor(private language: LanguageService, private router: Router) {}

  ngOnInit(): void {}

  ngAfterContentInit() {
    if (this.router.url === '/services') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'pageLoad',
        'page.language': this.language.get(),
        'page.type': 'Services',
        'niche.type': '',
        'product.type': '',
        'filter.type': '',
      });
      // console.log(window.dataLayer);
    }
  }
}
