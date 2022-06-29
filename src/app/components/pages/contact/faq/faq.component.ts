import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';
import * as data from './faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  faq = data.questions;

  constructor(
    public language: LanguageService,
    config: NgbAccordionConfig,
    public loader: LoadingService
  ) {
    config.closeOthers = true;
  }

  ngOnInit(): void {}
}
