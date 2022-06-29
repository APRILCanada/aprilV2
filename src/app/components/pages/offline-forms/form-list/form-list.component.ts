import { Component, OnInit } from '@angular/core';

import {
  IMultiSelectOption,
  IMultiSelectTexts,
  IMultiSelectSettings,
} from 'ngx-bootstrap-multiselect';
import { LanguageService } from 'src/app/services/language.service';
import { MultiselectService } from 'src/app/services/multiselect.service';
import * as data from './offlineForms';

import { RiskFilterPipe } from 'src/app/pipes/risk-filter.pipe';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';

declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
  providers: [RiskFilterPipe],
})
export class FormListComponent implements OnInit {
  forms = data.forms;
  totalLength: number;
  page: number = 1;

  searchValue: string;
  riskEn: IMultiSelectOption[] = this.dropDown.riskEn;
  riskFr: IMultiSelectOption[] = this.dropDown.riskFr;
  textRiskFr: IMultiSelectTexts = this.dropDown.textRiskFr;
  textRiskEn: IMultiSelectTexts = this.dropDown.textRiskEn;
  settings: IMultiSelectSettings = this.dropDown.greenSettings;
  // filteredForms: {
  //   id: string;
  //   riskCategory: string;
  //   titleFr: string;
  //   titleEn: string;
  //   linkFr: string;
  //   linkEn: string;
  //   icon: string;
  // }[] = [];
  filteredForms: any;
  sortedForms: {
    id: string;
    riskCategory: string;
    titleFr: string;
    titleEn: string;
    linkFr: string;
    linkEn: string;
    icon: string;
  }[];

  riskCategory: FormGroup = new FormGroup({
    risk: new FormControl(''),
  });
  riskModel: string;

  constructor(
    public language: LanguageService,
    private dropDown: MultiselectService,
    private riskFilter: RiskFilterPipe,
    public loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.riskCategory.controls['risk'].valueChanges.subscribe((filter) => {
      if (filter) {
        // console.log(filter);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'pageLoad',
          'page.language': this.language.get(),
          'page.type': 'Formulaire hors ligne',
          'niche.type': '',
          'product.type': '',
          'filter.type': this.riskFr.find((x) => x.id == filter[0])?.name,
        });
        // console.log(window.dataLayer);
      }
      if (this.language.get() == 'fr') {
        this.forms = this.forms.sort((a, b) =>
          a.titleFr.localeCompare(b.titleFr)
        );
      } else {
        this.forms = this.forms.sort((a, b) =>
          a.titleEn.localeCompare(b.titleEn)
        );
      }
      this.filteredForms = this.forms.filter(
        (x) => x.riskCategory == this.riskModel
      );
      this.totalLength = this.filteredForms.length;
      this.page = 1;
    });
  }

  downloadPdf(pdfUrl: string, pdfName: string) {
    FileSaver.saveAs(pdfUrl, pdfName);
    // console.log(pdfUrl)
  }
}
