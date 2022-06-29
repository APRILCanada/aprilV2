import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HrService } from '../../../services/hr.service';
import { Job } from '../../../models/Job';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.scss'],
})
export class UpdateJobComponent implements OnInit {
  jobForm: FormGroup;

  id: string;
  job: Job = {
    id: '',
    isActive: '',
    picture: '',
    en: {
      title: '',
      pictureAlt: '',
      aprilDesc: {
        title: '',
        desc: '',
      },
      jobSummary: {
        title: '',
        desc: '',
      },
      requirement: {
        title: '',
        desc: '',
      },
      skills: {
        title: '',
        desc: '',
      },
      aprilAdvantages: {
        title: '',
        desc: '',
      },
      city: '',
    },
    fr: {
      title: '',
      pictureAlt: '',
      aprilDesc: {
        title: '',
        desc: '',
      },
      jobSummary: {
        title: '',
        desc: '',
      },
      requirement: {
        title: '',
        desc: '',
      },
      skills: {
        title: '',
        desc: '',
      },
      aprilAdvantages: {
        title: '',
        desc: '',
      },
      city: '',
    },
  };

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

    this.jobForm = new FormGroup({
      isActive: new FormControl(null),
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
  }

  onSubmit() {
    this.job.isActive = this.jobForm.value.isActive || this.job.isActive;
    this.job.picture = this.jobForm.value.picture || this.job.picture;
    this.job.en.city = this.jobForm.value.en.city || this.job.en.city;
    this.job.en.title = this.jobForm.value.en.title || this.job.en.title;
    this.job.en.pictureAlt =
      this.jobForm.value.en.pictureAlt || this.job.en.pictureAlt;
    this.job.en.aprilDesc.title =
      this.jobForm.value.en.aprilDesc.title || this.job.en.aprilDesc.title;
    this.job.en.jobSummary.title =
      this.jobForm.value.en.jobSummary.title || this.job.en.jobSummary.title;
    this.job.en.jobSummary.desc =
      this.jobForm.value.en.jobSummary.desc || this.job.en.jobSummary.desc;
    this.job.en.requirement.title =
      this.jobForm.value.en.requirement.title || this.job.en.requirement.title;
    this.job.en.requirement.desc =
      this.jobForm.value.en.requirement.desc || this.job.en.requirement.desc;
    this.job.en.skills.title =
      this.jobForm.value.en.skills.title || this.job.en.skills.title;
    this.job.en.skills.desc =
      this.jobForm.value.en.skills.desc || this.job.en.skills.desc;
    this.job.en.aprilAdvantages.title =
      this.jobForm.value.en.aprilAdvantages.title ||
      this.job.en.aprilAdvantages.title;
    this.job.en.aprilAdvantages.desc =
      this.jobForm.value.en.aprilAdvantages.desc ||
      this.job.en.aprilAdvantages.desc;
    this.job.fr.city = this.jobForm.value.fr.city || this.job.fr.city;
    this.job.fr.title = this.jobForm.value.fr.title || this.job.fr.title;
    this.job.fr.pictureAlt =
      this.jobForm.value.fr.pictureAlt || this.job.fr.pictureAlt;
    this.job.fr.aprilDesc.title =
      this.jobForm.value.fr.aprilDesc.title || this.job.fr.aprilDesc.title;
    this.job.fr.aprilDesc.desc =
      this.jobForm.value.fr.aprilDesc.desc || this.job.fr.aprilDesc.desc;
    this.job.fr.jobSummary.title =
      this.jobForm.value.fr.jobSummary.title || this.job.fr.jobSummary.title;
    this.job.fr.jobSummary.desc =
      this.jobForm.value.fr.jobSummary.desc || this.job.fr.jobSummary.desc;
    this.job.fr.requirement.title =
      this.jobForm.value.fr.requirement.title || this.job.fr.requirement.title;
    this.job.fr.requirement.desc =
      this.jobForm.value.fr.requirement.desc || this.job.fr.requirement.desc;
    this.job.fr.skills.title =
      this.jobForm.value.fr.skills.title || this.job.fr.skills.title;
    this.job.fr.skills.desc =
      this.jobForm.value.fr.skills.desc || this.job.fr.skills.desc;
    this.job.fr.aprilAdvantages.title =
      this.jobForm.value.fr.aprilAdvantages.title ||
      this.job.fr.aprilAdvantages.title;
    this.job.fr.aprilAdvantages.desc =
      this.jobForm.value.fr.aprilAdvantages.desc ||
      this.job.fr.aprilAdvantages.desc;

    this.hrService.updateJob(this.job);
    this.router.navigate(['/interface/jobs/details/' + this.job.id]);
    // popup thank you
  }
}
