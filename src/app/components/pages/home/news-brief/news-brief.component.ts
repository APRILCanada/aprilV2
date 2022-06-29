import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-news-brief',
  templateUrl: './news-brief.component.html',
  styleUrls: ['./news-brief.component.scss'],
})
export class NewsBriefComponent implements OnInit {
  constructor(public language: LanguageService) {}

  ngOnInit(): void {}
}
