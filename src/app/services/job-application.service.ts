import { Injectable } from '@angular/core';
import { Job } from 'src/app/components/firebase/models/Job';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  public _job: BehaviorSubject<Job> = new BehaviorSubject<Job>(
    new Job()
  );

  job: Job;

  getJob() {
    return this._job;
  }

  setJob(newJob: Job) {
    this.job = newJob;
    this._job.next(newJob);
  }

}
