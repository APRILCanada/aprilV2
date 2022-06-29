import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NicheService } from '../../../services/niche.service';
import { Niche } from '../../../models/Niche';
import { LanguageService } from 'src/app/services/language.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMultiSelectSettings } from 'ngx-bootstrap-multiselect';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create-niche',
  templateUrl: './create-niche.component.html',
  styleUrls: ['./create-niche.component.scss'],
})
export class CreateNicheComponent implements OnInit {
  nicheForm: FormGroup;
  sectionIntro: boolean = true;
  sectionFr: boolean = false;
  sectionEn: boolean = false;
  progress: number = 0;

  nicheSettings: IMultiSelectSettings = {
    selectionLimit: 1,
    autoUnselect: true,
    closeOnSelect: true,
    buttonClasses: 'btn btn-primary',
  };

  introCompleted: boolean = true;
  frCompleted: boolean = false;
  enCompleted: boolean = false;

  niche: Niche;
  niches: any[];

  constructor(
    private nicheService: NicheService,
    public language: LanguageService,
    private router: Router,
    private modalService: NgbModal,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.nicheForm = new FormGroup({
      isActive: new FormControl(false),
      id: new FormControl(null),
      type: new FormControl(null),
      mainImg: new FormControl(null),
      secondaryImg: new FormControl(null),
      icon: new FormControl(null),
      director: new FormGroup({
        name: new FormControl(null),
        linkedIn: new FormControl(null),
        email: new FormControl(null, Validators.email),
        img: new FormControl(null),
        imgAlt: new FormControl(null),
      }),
      en: new FormGroup({
        title: new FormControl(null),
        desc: new FormControl(null),
        directorTitle: new FormControl(null),
        directorDesc: new FormControl(null),
        mainImgAlt: new FormControl(null),
        secondaryImgAlt: new FormControl(null),
      }),
      fr: new FormGroup({
        title: new FormControl(null),
        desc: new FormControl(null),
        directorTitle: new FormControl(null),
        directorDesc: new FormControl(null),
        mainImgAlt: new FormControl(null),
        secondaryImgAlt: new FormControl(null),
      }),
    });

    this.niches = this.nicheService.getNichesList();
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
    this.niche = this.nicheForm.value;

    this.nicheService.createNiche(this.niche.id, this.niche);
    this.nicheForm.reset();
    this.router.navigate(['/interface/niches']);
  }

  send() {
    this.onSubmit();
    this.modalService.dismissAll();
  }
}
