import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-career-brief',
  templateUrl: './career-brief.component.html',
  styleUrls: ['./career-brief.component.scss']
})
export class CareerBriefComponent implements OnInit {

  constructor(public language: LanguageService) { }

  ngOnInit(): void {
  }

}
