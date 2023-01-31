import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/services/language.service';
import { Title, Meta } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { LoadingService } from 'src/app/services/loading.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

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

  constructor(
    private modalService: NgbModal,
    private language: LanguageService,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private loader: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

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
