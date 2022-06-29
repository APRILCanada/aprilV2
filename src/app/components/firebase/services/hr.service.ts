import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/Job'
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HrService {

  jobsCollection: AngularFirestoreCollection<Job>;
  jobDoc: AngularFirestoreDocument<Job>;
  jobs: Observable<Job[]>;
  job: any;

  constructor(private afs: AngularFirestore) { 
    this.jobsCollection = afs.collection<Job>('jobs');
    this.jobs = this.jobsCollection.snapshotChanges().pipe(
      map(actions => actions.map((a: any) => {
        const data = a.payload.doc.data() as Job;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
  }

  getJobs(): Observable<Job[]> {
    return this.jobs;
  }

  createJob(id: any,job: Job) {
    this.jobsCollection.doc(id).set(job);
  }

  getJob (id: string): Observable<Job> {
    this.jobDoc = this.afs.doc<Job>(`jobs/${id}`);
    this.job = this.jobDoc.snapshotChanges().pipe(
      map(action => {
        if(action.payload.exists === false) {
          return null;
        } else {
            const data = action.payload.data() as Job;
            data.id = action.payload.id;
            return data;
        }
      }))
      return this.job
  }

  updateJob(job:Job){
    this.jobDoc = this.afs.doc(`jobs/${job.id}`);
    this.jobDoc.update(job);
  }

  deleteJob(job:Job){
    this.jobDoc = this.afs.doc(`jobs/${job.id}`);
    this.jobDoc.delete();
  }
}