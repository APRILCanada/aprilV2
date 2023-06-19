import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControlState, SetValueAction } from 'ngrx-forms';
import { Question } from 'src/app/flashquote/models/Question';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss']
})
export class BooleanComponent implements OnInit {
  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any
  selected: string = ''
  showError: boolean = false;


  constructor(public language: LanguageService, private store: Store) { }

  ngOnInit(): void {}

  select(value: string) {
    this.selected = value;
    this.store.dispatch(new SetValueAction(this.control.id, this.selected));
    this.showError = true;
  }
}
