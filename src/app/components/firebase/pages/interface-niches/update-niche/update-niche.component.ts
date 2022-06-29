import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NicheService } from '../../../services/niche.service';
import { Niche } from '../../../models/Niche';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { IMultiSelectSettings } from 'ngx-bootstrap-multiselect';
import { LoadingService } from 'src/app/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-niche',
  templateUrl: './update-niche.component.html',
  styleUrls: ['./update-niche.component.scss'],
})
export class UpdateNicheComponent implements OnInit {
  nicheForm: FormGroup;
  niches: any[];

  nicheSettings: IMultiSelectSettings = {
    selectionLimit: 1,
    autoUnselect: true,
    closeOnSelect: true,
    buttonClasses: 'btn btn-primary',
  };

  id: string;
  niche: Niche = {
    id: '',
    isActive: '',
    type: '',
    mainImg: '',
    secondaryImg: '',
    icon: '',
    director: {
      name: '',
      linkedIn: '',
      email: '',
      img: '',
      imgAlt: '',
    },
    fr: {
      title: '',
      desc: '',
      directorTitle: '',
      directorDesc: '',
      mainImgAlt: '',
      secondaryImgAlt: '',
    },
    en: {
      title: '',
      desc: '',
      directorTitle: '',
      directorDesc: '',
      mainImgAlt: '',
      secondaryImgAlt: '',
    },
  };

  constructor(
    private nicheService: NicheService,
    private router: Router,
    private route: ActivatedRoute,
    public language: LanguageService,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    // getIdfromUrl
    this.id = this.route.snapshot.params['id'];
    this.nicheService.getNiche(this.id).subscribe((niche) => {
      this.niche = niche;
      this.loader.loading(false);
    });

    this.nicheForm = new FormGroup({
      isActive: new FormControl(null),
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
  }

  onSubmit() {
    this.niche.isActive = this.nicheForm.value.isActive || this.niche.isActive;
    this.niche.type = this.nicheForm.value.type || this.niche.type;
    this.niche.mainImg = this.nicheForm.value.mainImg || this.niche.mainImg;
    this.niche.secondaryImg =
      this.nicheForm.value.secondaryImg || this.niche.secondaryImg;
    this.niche.icon = this.nicheForm.value.icon || this.niche.icon;
    this.niche.director.name =
      this.nicheForm.value.director.name || this.niche.director.name;
    this.niche.director.linkedIn =
      this.nicheForm.value.director.linkedIn || this.niche.director.linkedIn;
    this.niche.director.email =
      this.nicheForm.value.director.email || this.niche.director.email;
    this.niche.director.img =
      this.nicheForm.value.director.img || this.niche.director.img;
    this.niche.director.imgAlt =
      this.nicheForm.value.director.imgAlt || this.niche.director.imgAlt;
    this.niche.fr.title = this.nicheForm.value.fr.title || this.niche.fr.title;
    this.niche.fr.desc = this.nicheForm.value.fr.desc || this.niche.fr.desc;
    this.niche.fr.directorTitle =
      this.nicheForm.value.fr.directorTitle || this.niche.fr.directorTitle;
    this.niche.fr.directorDesc =
      this.nicheForm.value.fr.directorDesc || this.niche.fr.directorDesc;
    this.niche.fr.mainImgAlt =
      this.nicheForm.value.fr.mainImgAlt || this.niche.fr.mainImgAlt;
    this.niche.fr.secondaryImgAlt =
      this.nicheForm.value.fr.secondaryImgAlt || this.niche.fr.secondaryImgAlt;
    this.niche.en.title = this.nicheForm.value.en.title || this.niche.en.title;
    this.niche.en.desc = this.nicheForm.value.en.desc || this.niche.en.desc;
    this.niche.en.directorTitle =
      this.nicheForm.value.en.directorTitle || this.niche.en.directorTitle;
    this.niche.en.directorDesc =
      this.nicheForm.value.en.directorDesc || this.niche.en.directorDesc;
    this.niche.en.mainImgAlt =
      this.nicheForm.value.en.mainImgAlt || this.niche.en.mainImgAlt;
    this.niche.en.secondaryImgAlt =
      this.nicheForm.value.en.secondaryImgAlt || this.niche.en.secondaryImgAlt;

    this.nicheService.updateNiche(this.niche);
    this.router.navigate(['/interface/niches/details/' + this.niche.id]);
    // popup thank you
  }
}
