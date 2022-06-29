import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { LanguageService } from '../../../services/language.service';
import { Niche } from '../../firebase/models/Niche';
import { NicheService } from '../../firebase/services/niche.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  niches: any[];
  niche: Niche;
  lang: string;
  id: string;
  mobileMenu: boolean;
  private unlisten: () => void;

  constructor(
    private router: Router,
    public language: LanguageService,
    private nicheService: NicheService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.mobileMenu = false;
    this.lang = this.language.get();

    this.niches = this.nicheService.getNichesList();

    this.unlisten = this.renderer.listen('window', 'scroll', () => {
      if (window.pageYOffset > 150) {
        let stick = () => {
          let toStick = document.getElementById('to-stick');
          toStick?.classList.add('is-sticky');
          let toChange = document.getElementById('to-change');
          toChange?.classList.add('is-changed');
        };
        stick();
      } else {
        let unStick = () => {
          let toUnStick = document.getElementById('to-stick');
          toUnStick?.classList.remove('is-sticky');
          let toUnChange = document.getElementById('to-change');
          toUnChange?.classList.remove('is-changed');
        };
        unStick();
      }
    })
  }

  ngOnDestroy() {
    this.unlisten()
  }

  toggleMobileMenu() {
    if (this.mobileMenu === true) {
      this.mobileMenu = false;
    } else {
      this.mobileMenu = true;
    }
    // console.log(this.mobileMenu);
  }
}
