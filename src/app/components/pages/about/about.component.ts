import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';

declare global {
  interface Window {
    dataLayer: any;
  }
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, AfterContentInit {
  constructor(private language: LanguageService, private router: Router) {}

  ngOnInit(): void {}

  ngAfterContentInit() {
    if (this.router.url === '/a-propos') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'pageLoad',
        'page.language': this.language.get(),
        'page.type': 'Qui somme-nous ?',
        'niche.type': '',
        'product.type': '',
        'filter.type': '',
      });
      // console.log(window.dataLayer);
    }
  }
}
