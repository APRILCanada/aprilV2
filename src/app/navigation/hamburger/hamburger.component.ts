import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { MobileService } from '../services/mobile.service';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
})
export class HamburgerComponent implements OnInit {
  isOpened = false;

  constructor(public mobile: MobileService, public language: LanguageService) {}

  ngOnInit(): void {}

  toggleNav() {
    this.isOpened = !this.mobile.getState();
    // console.log(this.isOpened);
    this.mobile.setState(this.isOpened);
  }
}
