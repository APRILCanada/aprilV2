import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-about-hero',
  templateUrl: './about-hero.component.html',
  styleUrls: ['./about-hero.component.scss'],
})
export class AboutHeroComponent implements OnInit {
  constructor(
    public language: LanguageService,
    public loader: LoadingService
  ) {}

  ngOnInit(): void {}
}
