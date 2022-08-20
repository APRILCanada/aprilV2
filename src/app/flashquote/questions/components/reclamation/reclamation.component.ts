import { Component, Input, OnInit } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { group } from 'console';
import format from 'date-fns/format';
import { AddArrayControlAction, FormControlState, NgrxValueConverter, NgrxValueConverters, RemoveArrayControlAction, RemoveGroupControlAction, SetValueAction } from 'ngrx-forms';
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
  claimsOpened: string[] = ['','','','',''];

  constructor(public language: LanguageService, public translate: TranslateService, private store: Store<State>, private actionsSubject: ActionsSubject) { }

  // keep input focused in for loop: https://github.com/ngrx/store/issues/176
  customTrackBy(index: number): any {
    return index;
  }

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

  setClaimStatus(value: string, index: number) {
    this.claimsOpened.splice(index, 1, value)
    console.log('claims', this.claimsOpened)
    this.actionsSubject.next(new SetValueAction(`${this.control.id}.${index}.opened`, this.claimsOpened[index]))
  }

  dateValueConverter: NgrxValueConverter<Date | null, string | null> = {
    convertViewToStateValue(value) {
      if (value === null) {
        return null;
      }

      // format date
      return format(new Date(value.getFullYear(), value.getMonth(), value.getDate()), 'dd-MM-yyyy')
    },
    convertStateToViewValue: NgrxValueConverters.dateToISOString.convertStateToViewValue,
  };
}
