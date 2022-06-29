import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-direct-hero',
  templateUrl: './direct-hero.component.html',
  styleUrls: ['./direct-hero.component.scss'],
})
export class DirectHeroComponent implements OnInit {
  id: string;

  constructor(
    public language: LanguageService,
    public loader: LoadingService,
    private route: ActivatedRoute,
    public page: PageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  scrollToSection(section: any) {
    if (section === '3 easy steps') {
      document.getElementById('3Steps')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    } else if (section === 'Meet With Us') {
      document.getElementById('Meet')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    } else {
      document.getElementById('Form')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}
