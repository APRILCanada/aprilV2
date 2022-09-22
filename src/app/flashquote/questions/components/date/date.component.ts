import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { FormControlState, NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';
import { Question } from 'src/app/flashquote/models/Question';
import { LanguageService } from 'src/app/services/language.service';
import { format } from 'date-fns';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DateComponent {
  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any
  selected: string;

  dateValueConverter: NgrxValueConverter<Date | null, string | null> = {
    convertViewToStateValue(value) {
      if (value === null) {
        return null;
      }

      value = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
      return NgrxValueConverters.dateToISOString.convertViewToStateValue(value);
    },
    convertStateToViewValue: NgrxValueConverters.dateToISOString.convertStateToViewValue
  };

  constructor(public language: LanguageService, public translate: TranslateService) { }

}
