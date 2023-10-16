import { Component, OnInit } from '@angular/core';

import {
  IMultiSelectOption,
  IMultiSelectTexts,
  IMultiSelectSettings,
} from 'ngx-bootstrap-multiselect';
import { LanguageService } from 'src/app/services/language.service';
import { MultiselectService } from 'src/app/services/multiselect.service';
import * as data from '../../../offline-forms/form-list/offlineForms';

import { RiskFilterPipe } from 'src/app/pipes/risk-filter.pipe';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { Job } from 'src/app/components/firebase/models/Job';
import { HrService } from 'src/app/components/firebase/services/hr.service';
import { CityFilterPipe } from 'src/app/pipes/city-filter.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, tap } from 'rxjs';

declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  providers: [CityFilterPipe],
})
export class JobListComponent implements OnInit {
  jobsEn: any;
  jobsFr: any;

  joinJobs: any[];

  jobs: Job[];
  job: Job;

  cityEn: IMultiSelectOption[] = [
    { id: 'Brossard', name: 'Brossard' },
    { id: 'Toronto', name: 'Toronto' },
  ];
  cityFr: IMultiSelectOption[] = [
    { id: 'Brossard', name: 'Brossard' },
    { id: 'Toronto', name: 'Toronto' },
  ];
  cityTitleFr: IMultiSelectTexts = { defaultTitle: 'Ville' };
  cityTitleEn: IMultiSelectTexts = { defaultTitle: 'City' };

  settings: IMultiSelectSettings = {
    buttonClasses:
      'form-control d-flex justify-content-between align-items-center drop-down-button px-4',
    containerClasses: ' d-block',
    selectionLimit: 1,
    autoUnselect: true,
    closeOnSelect: true,
  };
  forms = data.forms;
  totalLength: number;
  page: number = 1;

  searchValue: string;

  cityCategory: FormGroup = new FormGroup({
    city: new FormControl(''),
  });
  cityModel: string;

  constructor(
    private hrService: HrService,
    public language: LanguageService,
    private dropDown: MultiselectService,
    private cityFilter: CityFilterPipe,
    public loader: LoadingService,
    private modalService: NgbModal,
    private jobApplication: JobApplicationService,
    private httpClient: HttpClient,
  ) {}

  ngOnInit(): void {
    this.httpClient.get('https://april.talentnest.com/en/feed/latest/100').subscribe((jobsEn) => {
      this.jobsEn = jobsEn;
      this.jobsEn = this.jobsEn.jobs;
    });

    this.httpClient.get('https://april.talentnest.com/fr/feed/latest/100').subscribe((jobsFr) => {
      this.jobsFr = jobsFr;
      this.jobsFr = this.jobsFr.jobs;

      this.joinJobs = [];
      // Ne pas oublier le cas ou des jobs existent en anglais, mais pas en francais.
      // Mettre un cas par défaut
      for (let i = 0; i < this.jobsFr.length ; i++) {
        this.joinJobs.push({
          fr: this.jobsFr[i],
          en: this.jobsEn[i]
        })
      }
    });

    



    this.totalLength = this.joinJobs.length;

    // this.cityCategory.controls['city'].valueChanges.subscribe((filter) => {


    //   this.page = 1;
    // });
  }

  resetPagination() {
    this.page = 1;
  }

  openModal(content: any, data: any) {
    this.job = data;
    this.modalService.open(content, { size: 'xl', centered: true });
  }

}
