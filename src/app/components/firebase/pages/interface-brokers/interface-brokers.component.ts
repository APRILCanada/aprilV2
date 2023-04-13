import { Component, OnInit } from '@angular/core';
import { HrService } from '../../services/hr.service';
import { Job } from '../../models/Job';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import {  Router } from '@angular/router';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { LoadingService } from 'src/app/services/loading.service';
import { BrokerService } from '../../services/brokers.service';
import { Broker } from '../../models/Broker';


@Component({
  selector: 'app-interface-brokers',
  templateUrl: './interface-brokers.component.html',
  styleUrls: ['./interface-brokers.component.scss']
})
export class InterfaceBrokersComponent implements OnInit {
  brokers: Broker[];
  totalLength: number;
  page: number = 1;
  searchValue: string;
  lang: string;

  constructor(
    private brokerService :  BrokerService,
    public language: LanguageService,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
   this.brokerService.getBrokers().subscribe((brokers) => {
    this.brokers = brokers
      this.totalLength = this.brokers.length;
      this.loader.loading(false);
      console.log(this.brokers)
    });
  }

  onSearchChange(event: Event): void {
    this.searchValue = (event.target as HTMLInputElement)?.value;
    // this.hrService.getJobs().subscribe((jobs) => {
    //   // this.jobs = this.searchFilter.transform(jobs, this.searchValue);
    //   this.totalLength = this.jobs.length;
    //   this.page = 1;
    // });
  }
}

