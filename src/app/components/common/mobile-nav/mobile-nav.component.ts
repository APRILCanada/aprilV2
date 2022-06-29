import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Niche } from '../../firebase/models/Niche';
import { NicheService } from '../../firebase/services/niche.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent implements OnInit {
  niches: Niche[];

  constructor(
    private nicheService: NicheService,
    private language: LanguageService
  ) { }

  ngOnInit(): void {
    this.nicheService.getNiches().subscribe((niches) => {
      this.niches = niches;
    });

    // window.addEventListener('scroll', () => {
    //   let toStick = document.getElementById('to-stick');
    //   let dropDown = document.getElementById('dropDown');
    //   if (window.pageYOffset > 44) {
    //     let stick = () => {
    //       toStick.classList.add('is-sticky');
    //       dropDown.classList.add('is-sticky');
    //     };
    //     stick();
    //   } else {
    //     let unStick = () => {
    //       toStick.classList.remove('is-sticky');
    //       dropDown.classList.remove('is-sticky');
    //     };
    //     unStick();
    //   }
    // });
  }

  toggleNav() {
    let x = document.getElementById('topNav');
    if (x) {
      if (x.className === 'topnav') {
        x.className += ' responsive';
      } else {
        x.className = 'topnav';
      }
    }
  }

  toggleClicked() {
    let dropDown = document.getElementById('dropDown');
    if (dropDown) {
      if (dropDown.className === 'dropdown pointer') {
        dropDown.className += ' clicked';
      } else {
        dropDown.className = 'dropdown pointer';
      }
    }
  }
}
