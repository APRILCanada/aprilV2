import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormControlState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { Question } from 'src/app/flashquote/models/Question';
import { State } from 'src/app/flashquote/store';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {
  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any
  group$: Observable<any>

  constructor(public language: LanguageService, private store: Store<State>) { }


  ngOnInit() {
    this.group$ = this.store.pipe(
      select((s) => s.form.formState.controls[this.question.id].controls)
    );
  }
}
