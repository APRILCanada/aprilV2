import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Niche } from '../../../models/Niche';
import { NicheService } from '../../../services/niche.service';

@Component({
  selector: 'app-niche-details',
  templateUrl: './niche-details.component.html',
  styleUrls: ['./niche-details.component.scss'],
})
export class NicheDetailsComponent implements OnInit {
  id: string;

  niche: Niche = {
    id: '',
    type: '',
    isActive: '',
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
  }

  onDelete() {
    this.nicheService.deleteNiche(this.niche);
    this.router.navigate(['/interface/niches']);
  }
}
