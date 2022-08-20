import { Component, Input, OnInit } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AddArrayControlAction, FormControlState, RemoveArrayControlAction, RemoveGroupControlAction, SetValueAction } from 'ngrx-forms';
import { Observable, tap } from 'rxjs';
import { RemoveGroupElementAction } from 'src/app/flashquote/actions/flashquote.actions';
import { Question } from 'src/app/flashquote/models/Question';
import { State } from 'src/app/flashquote/store';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {
  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any
  group$: Observable<any>

  constructor(public language: LanguageService, public translate: TranslateService, private store: Store<State>, private actionsSubject: ActionsSubject) { }

  ngOnInit(): void {
    this.group$ = this.store.pipe(select((s) => s.form.formState.controls[this.question.id]));
    console.log('this.control', this.control)
  }

  removeClaim(index: number) {
    this.actionsSubject.next(
      new RemoveArrayControlAction(this.control.id, index)
    )
    this.group$.subscribe(group => {
      if (group?.controls.length === 0) {
        this.actionsSubject.next(new SetValueAction('generic.265', 'false'))
      }
    })
  }

  addClaim() {
    this.actionsSubject.next(
      new AddArrayControlAction<any>(
        this.control.id, { date: '', details: '', amount: '', reserve: '', opened: '' }
      )
    )
  }
}
