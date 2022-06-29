import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';

declare global {
  interface Window {
    dataLayer: any;
  }
}

@Component({
  selector: 'app-offline-forms',
  templateUrl: './offline-forms.component.html',
  styleUrls: ['./offline-forms.component.scss'],
})
export class OfflineFormsComponent implements OnInit, AfterContentInit {
  constructor(public language: LanguageService, private router: Router) {}

  ngOnInit(): void {}

  ngAfterContentInit() {
    if (this.router.url === '/formulaires') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'pageLoad',
        'page.language': this.language.get(),
        'page.type': 'Formulaire hors ligne',
        'niche.type': '',
        'product.type': '',
        'filter.type': '',
      });
      // console.log(window.dataLayer);
    }
  }
}
