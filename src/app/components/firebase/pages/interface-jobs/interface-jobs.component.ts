import { Component, OnInit } from '@angular/core';
import { HrService } from '../../services/hr.service';
import { Job } from '../../models/Job';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-interface-jobs',
  templateUrl: './interface-jobs.component.html',
  styleUrls: ['./interface-jobs.component.scss'],
  providers: [SearchFilterPipe],
})
export class InterfaceJobsComponent implements OnInit {
  jobs: Job[];
  totalLength: number;
  page: number = 1;
  searchValue: string;
  lang: string;

  constructor(
    private hrService: HrService,
    public language: LanguageService,
    private translate: TranslateService,
    private router: Router,
    private searchFilter: SearchFilterPipe,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.hrService.getJobs().subscribe((jobs) => {
      this.jobs = this.searchFilter.transform(jobs, this.searchValue);
      this.totalLength = this.jobs.length;
      this.loader.loading(false);
    });
  }

  onSearchChange(event: Event): void {
    this.searchValue = (event.target as HTMLInputElement)?.value;
    this.hrService.getJobs().subscribe((jobs) => {
      this.jobs = this.searchFilter.transform(jobs, this.searchValue);
      this.totalLength = this.jobs.length;
      this.page = 1;
    });
  }
}
