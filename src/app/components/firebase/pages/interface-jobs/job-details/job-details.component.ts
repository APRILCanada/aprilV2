import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Job } from '../../../models/Job';
import { HrService } from '../../../services/hr.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  id: string;
  job: Job;

  constructor(
    private hrService: HrService,
    private router: Router,
    private route: ActivatedRoute,
    public language: LanguageService,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    // getIdfromUrl
    this.id = this.route.snapshot.params['id'];
    this.hrService.getJob(this.id).subscribe((job) => {
      this.job = job;
      this.loader.loading(false);
    });
  }

  onDelete() {
    this.hrService.deleteJob(this.job);
    this.router.navigate(['/interface/jobs']);
  }
}
