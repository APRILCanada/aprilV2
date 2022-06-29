import { Component, OnInit } from '@angular/core';
import { MobileService } from '../services/mobile.service';
import * as data from '../data/menu';
import * as data2 from '../data/socials';
import { Social } from '../models/social';
import { Link } from '../models/link';
import { LanguageService } from 'src/app/services/language.service';
import { DOCUMENT_PROVIDERS } from 'ngx-owl-carousel-o/lib/services/document-ref.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent implements OnInit {
  menu = data.menu;
  socials: Social[] = data2.socials;
  imgSrc?: string;
  year?: Number;
  constructor(public mobile: MobileService, public language: LanguageService) {}

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }
  scrollToSection(section: any) {
    this.mobile.setState(false);
    if (section === '3 easy steps') {
      document.getElementById('3Steps')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    } else if (section === 'Meet With Us') {
      document.getElementById('Meet')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    } else {
      document.getElementById('Form')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}
