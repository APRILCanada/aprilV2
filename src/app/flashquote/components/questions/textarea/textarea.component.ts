import { Component, Input, OnInit } from '@angular/core';
import { FormControlState } from 'ngrx-forms';
import { Question } from 'src/app/flashquote/models/Question';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any

  constructor(public language: LanguageService) { }

  ngOnInit(): void {
  }

}
