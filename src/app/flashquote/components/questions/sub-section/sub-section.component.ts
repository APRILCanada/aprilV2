import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/flashquote/models/Question';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-sub-section',
  templateUrl: './sub-section.component.html',
  styleUrls: ['./sub-section.component.scss']
})
export class SubSectionComponent implements OnInit {
  @Input() question: Question;

  constructor(public language: LanguageService) { }

  ngOnInit(): void {
    console.log('label', this.question)
  }

}
