import { Component, Input, OnInit } from '@angular/core';
import { FormControlState } from 'ngrx-forms';
import { Question } from 'src/app/flashquote/models/Question';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any
  inputType: string;

  constructor() {}

  ngOnInit(): void {
    this.inputType = this.question.type.toLocaleLowerCase();
  }
}
