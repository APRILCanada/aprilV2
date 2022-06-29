import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HrService } from '../../../services/hr.service';
import { Job } from '../../../models/Job';
import { LanguageService } from 'src/app/services/language.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent implements OnInit {
  jobForm: FormGroup;
  sectionIntro: boolean = true;
  sectionFr: boolean = false;
  sectionEn: boolean = false;
  progress: number = 0;

  introCompleted: boolean = true;
  frCompleted: boolean = false;
  enCompleted: boolean = false;

  job: Job;

  constructor(
    private hrService: HrService,
    public language: LanguageService,
    private router: Router,
    private modalService: NgbModal,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.jobForm = new FormGroup({
      isActive: new FormControl('notActive'),
      id: new FormControl(null),
      picture: new FormControl(null),

      en: new FormGroup({
        title: new FormControl(null, Validators.required),
        pictureAlt: new FormControl(null),
        aprilDesc: new FormGroup({
          title: new FormControl(null),
          desc: new FormControl(null),
        }),
        jobSummary: new FormGroup({
          title: new FormControl(null),
          desc: new FormControl(null),
        }),
        requirement: new FormGroup({
          title: new FormControl(null),
          desc: new FormControl(null),
        }),
        skills: new FormGroup({
          title: new FormControl(null),
          desc: new FormControl(null),
        }),
        aprilAdvantages: new FormGroup({
          title: new FormControl(null),
          desc: new FormControl(null),
        }),
        city: new FormControl(null, Validators.required),
      }),

      fr: new FormGroup({
        title: new FormControl(null, Validators.required),
        pictureAlt: new FormControl(null),
        aprilDesc: new FormGroup({
          title: new FormControl(null),
          desc: new FormControl(null),
        }),
        jobSummary: new FormGroup({
          title: new FormControl(null),
          desc: new FormControl(null),
        }),
        requirement: new FormGroup({
          title: new FormControl(null),
          desc: new FormControl(null),
        }),
        skills: new FormGroup({
          title: new FormControl(null),
          desc: new FormControl(null),
        }),
        aprilAdvantages: new FormGroup({
          title: new FormControl(null),
          desc: new FormControl(null),
        }),
        city: new FormControl(null, Validators.required),
      }),
    });
    this.loader.loading(false);
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  completeIntro() {
    this.frCompleted = false;
    this.enCompleted = false;
    this.progress = 0;
    this.sectionIntro = true;
    this.sectionFr = false;
    this.sectionEn = false;
  }

  completeFr() {
    this.frCompleted = true;
    this.enCompleted = false;
    this.progress = 50;
    this.sectionIntro = false;
    this.sectionFr = true;
    this.sectionEn = false;
  }

  completeEn() {
    this.enCompleted = true;
    this.progress = 100;
    this.sectionIntro = false;
    this.sectionFr = false;
    this.sectionEn = true;
  }

  previous() {
    if (this.sectionFr == true) {
      this.sectionFr = false;
      this.sectionIntro = true;
      this.frCompleted = false;
      this.progress = 0;
    } else if (this.sectionEn == true) {
      this.sectionEn = false;
      this.sectionFr = true;
      this.enCompleted = false;
      this.progress = 50;
    }
  }

  next() {
    //  popup if error
    if (this.sectionIntro == true) {
      this.sectionIntro = false;
      this.sectionFr = true;
      this.frCompleted = true;
      this.progress = 50;
    } else if (this.sectionFr == true) {
      this.sectionFr = false;
      this.sectionEn = true;
      this.enCompleted = true;
      this.progress = 100;
    }
  }

  onSubmit() {
    this.job = this.jobForm.value;
    this.hrService.createJob(this.job.id, this.job);
    this.jobForm.reset();
    this.router.navigate(['/interface/jobs']);
  }

  send() {
    this.onSubmit();
    this.modalService.dismissAll();
  }
}
