import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.scss'],
})
export class HomeHeroComponent implements OnInit {
  constructor(
    public language: LanguageService,
    public loader: LoadingService
  ) {}

  ngOnInit(): void {}
}
