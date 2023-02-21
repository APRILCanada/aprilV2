import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import {MatDialog} from '@angular/material/dialog';


declare global {
  interface Window {
    dataLayer: any;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterContentInit {
  pageLoaded: boolean = false;
  isDirect: boolean = true;

  constructor(

    private language: LanguageService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
  }

  ngAfterContentInit() {
    this.isDirect = this.router.url.includes('direct')    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageLoad',
      'page.language': this.language.get(),
      'page.type': 'Accueil',
      'niche.type': '',
      'product.type': '',
      'filter.type': '',
    });
    // console.log(window.dataLayer);
   
  }


}
