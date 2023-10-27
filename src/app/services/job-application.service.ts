import { Injectable } from '@angular/core';
import { Job } from 'src/app/components/firebase/models/Job';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  public _job: BehaviorSubject<Job> = new BehaviorSubject<Job>(
    new Job()
  );

  constructor(
    private httpClient: HttpClient,
  ) {}

  job: Job;

  getJob() {
    return this._job;
  }

  setJob(newJob: Job) {
    this.job = newJob;
    this._job.next(newJob);
  }

  getJobsEn(){
    return this.httpClient.get<any>('https://april.talentnest.com/en/feed/latest/100');
  }

  getJobsFr() {
    return  this.httpClient.get<any>('https://april.talentnest.com/fr/feed/latest/100');
  }
  

   

}
