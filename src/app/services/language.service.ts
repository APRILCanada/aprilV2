import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from './seo.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  lang: string;
  constructor(private translate: TranslateService, private seo: SeoService) {}

  get() {
    this.lang = localStorage.getItem('lang') || ((navigator.language == 'fr' || navigator.language == 'en' ) ? navigator.language : 'en');
    return this.lang;
  }

  set(lang: string) {
    this.lang = lang;
    localStorage.setItem('lang', this.lang);
    this.translate.use(this.lang);
    window.dataLayer.push({
      event: 'pageLoad',
      'page.language': this.get(),
      'niche.type': '',
      'product.type': '',
      'filter.type': '',
    });
  }

  switch() {
    //this.seo.update(this.get);
    if (this.get() === 'fr') {
      this.set('en');
    } else {
      this.set('fr');
    }
    window.dataLayer.push({
      event: 'pageLoad',
      'page.language': this.get(),
      'niche.type': '',
      'product.type': '',
      'filter.type': '',
    });
  }
}
