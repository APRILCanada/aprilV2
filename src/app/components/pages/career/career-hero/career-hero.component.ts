import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-career-hero',
  templateUrl: './career-hero.component.html',
  styleUrls: ['./career-hero.component.scss'],
})
export class CareerHeroComponent implements OnInit {
  constructor(
    public language: LanguageService,
    public loader: LoadingService
  ) {}

  ngOnInit(): void {}

  scrollToJobs() {
    document.getElementById('jobs')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
