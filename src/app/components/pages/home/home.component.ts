import { AfterContentInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/services/language.service';
import { Title, Meta } from '@angular/platform-browser';
import { LoadingService } from 'src/app/services/loading.service';
import {MatDialog} from '@angular/material/dialog';

import { filter } from 'rxjs';

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
    this.isDirect = this.router.url.includes('direct')    
  }

  ngAfterContentInit() {
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

  // open(confirmModal: any) {
  //   this.modalService.open(confirmModal, { size: 'lg' });
  // }
}
