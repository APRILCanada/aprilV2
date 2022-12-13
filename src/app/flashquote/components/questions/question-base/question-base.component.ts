import { Component, Input } from '@angular/core';
import { FormControlState } from 'ngrx-forms';
import { Question } from '../../../models/Question';

@Component({
  selector: 'app-question-base',
  templateUrl: './question-base.component.html',
  styleUrls: ['./question-base.component.scss'],
})
export class QuestionBaseComponent {
  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any

}