import { Component, OnInit } from '@angular/core';
import { NicheService } from '../../services/niche.service';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Niche } from '../../models/Niche';
import { NichesFilterPipe } from 'src/app/pipes/niches-filter.pipe';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-interface-niches',
  templateUrl: './interface-niches.component.html',
  styleUrls: ['./interface-niches.component.scss'],
  providers: [NichesFilterPipe],
})
export class InterfaceNichesComponent implements OnInit {
  niches: Niche[];
  totalLength: number;
  page: number = 1;
  nicheValue: string;
  lang: string;

  constructor(
    private nicheService: NicheService,
    public language: LanguageService,
    private translate: TranslateService,
    private router: Router,
    private nichesFilter: NichesFilterPipe,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.nicheService.getNiches().subscribe((niches) => {
      this.niches = this.nichesFilter.transform(niches, this.nicheValue);
      // this.niches = niches
      this.totalLength = this.niches.length;
      this.loader.loading(false);
    });
  }

  onSearchChange(event: Event): void {
    const nicheValue = (event.target as HTMLInputElement)?.value;
    this.nicheService.getNiches().subscribe((niches) => {
      this.niches = this.nichesFilter.transform(niches, nicheValue);
      this.totalLength = this.niches.length;
      this.page = 1;
    });
  }
}
