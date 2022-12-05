import { Component, Input } from '@angular/core';
import { FormControlState } from 'ngrx-forms';
import { Question } from 'src/app/flashquote/models/Question';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {

  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any

  constructor(public language: LanguageService) { }

}
