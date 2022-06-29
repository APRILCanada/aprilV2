import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  IMultiSelectOption,
  IMultiSelectTexts,
  IMultiSelectSettings,
} from 'ngx-bootstrap-multiselect';
import { Job } from 'src/app/components/firebase/models/Job';
import { HrService } from 'src/app/components/firebase/services/hr.service';
import { CityFilterPipe } from 'src/app/pipes/city-filter.pipe';

import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss'],
  providers: [CityFilterPipe],
})
export class JobOffersComponent implements OnInit {
  jobs: Job[];
  activeJobs: Job[];
  filteredJobs: Job[];
  filters: FormGroup = new FormGroup({
    field: new FormControl(null),
    city: new FormControl(null),
  });
  city: any;
  cityF: string;

  fieldFr: IMultiSelectOption[] = [
    { id: '0', name: 'Marketing' },
    { id: '1', name: 'Comptabilité' },
    { id: '2', name: 'Souscription' },
    { id: '3', name: 'Expert en sinistre' },
    { id: '4', name: 'Informatique' },
    { id: '5', name: 'Administration' },
  ];
  fieldEn: IMultiSelectOption[] = [
    { id: '0', name: 'Marketing' },
    { id: '1', name: 'Accounting' },
    { id: '2', name: 'Underwriting' },
    { id: '3', name: 'Claims expert' },
    { id: '4', name: 'Computer science' },
    { id: '5', name: 'Administration' },
  ];
  cityEn: IMultiSelectOption[] = [
    { id: 'Brossard', name: 'Brossard' },
    { id: 'Laval', name: 'Laval' },
    { id: 'Toronto', name: 'Toronto' },
    { id: 'Calgary', name: 'Calgary' },
  ];
  cityFr: IMultiSelectOption[] = [
    { id: 'Brossard', name: 'Brossard' },
    { id: 'Laval', name: 'Laval' },
    { id: 'Toronto', name: 'Toronto' },
    { id: 'Calgary', name: 'Calgary' },
  ];
  cityTitleFr: IMultiSelectTexts = { defaultTitle: 'Ville' };
  cityTitleEn: IMultiSelectTexts = { defaultTitle: 'City' };
  fieldTitleFr: IMultiSelectTexts = { defaultTitle: 'Domaine' };
  fieldTitleEn: IMultiSelectTexts = { defaultTitle: 'Field' };
  settings: IMultiSelectSettings = {
    buttonClasses:
      'form-control d-flex justify-content-between align-items-center drop-down-button px-4',
    containerClasses: ' d-block',
    selectionLimit: 1,
    autoUnselect: true,
    closeOnSelect: true,
  };

  constructor(
    public language: LanguageService,
    private modalService: NgbModal,
    private hrService: HrService,
    private cityFilter: CityFilterPipe
  ) {}

  ngOnInit(): void {
    this.hrService.getJobs().subscribe((jobs) => {
      this.filteredJobs = jobs.filter((job) => job.isActive == 'isActive');
    });
    // this.totalLength = this.jobs.length
    // this.activeJobs = jobs.filter((job) => job.isActive == 'isActive');
  }

  onChange(e: any): void {
    this.hrService.getJobs().subscribe((jobs) => {
      if (this.cityF == 'Brossard') {
        this.filteredJobs = jobs.filter((job) => {
          job.en.city == 'Brossard';
        });
      }
    });
  }
}
