import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { FormControlState, NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';
import { Question } from 'src/app/flashquote/models/Question';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { subDays, addDays, subYears, addYears } from 'date-fns'

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DateComponent implements OnInit {
  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any
  selected: string;
  minDate: Date;
  maxDate: Date;

  constructor(public language: LanguageService, public translate: TranslateService) { }

  ngOnInit(): void {
    this.validateMinMaxDate();
  }

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


  validateMinMaxDate() {
    const minLengthHasNow = this.question.minLength.indexOf("now") > -1;
    const maxLengthHasNow = this.question.maxLength.indexOf("now") > -1;

    const minYear = this.question.minLength == "" ? 1900 : minLengthHasNow ? this.getNowPlusMinus("year", this.question.minLength) : Number.parseInt(this.question.minLength.split('-')[2]);
    const minMonth = this.question.minLength == "" ? 0 : minLengthHasNow ? this.getNowPlusMinus("month", this.question.minLength) : Number.parseInt(this.question.minLength.split('-')[1]) - 1;
    const minDay = this.question.minLength == "" ? 1 : minLengthHasNow ? this.getNowPlusMinus("day", this.question.minLength) : Number.parseInt(this.question.minLength.split('-')[0]);

    this.minDate = new Date(minYear, minMonth, minDay);

    var maxYear = this.question.maxLength == "" ? 2050 : maxLengthHasNow ? this.getNowPlusMinus("year", this.question.maxLength) : Number.parseInt(this.question.maxLength.split("-")[2]);
    var maxMonth = this.question.maxLength == "" ? 0 : maxLengthHasNow ? this.getNowPlusMinus("month", this.question.maxLength) : Number.parseInt(this.question.maxLength.split('-')[1]) - 1;
    var maxDay = this.question.maxLength == "" ? 1 : maxLengthHasNow ? this.getNowPlusMinus("day", this.question.maxLength) : Number.parseInt(this.question.maxLength.split('-')[0]);

    this.maxDate = new Date(maxYear, maxMonth, maxDay);
  }


  getNowPlusMinusDate(value: string) {
    let newDate = new Date()

    if (value.indexOf("+") > -1 || value.indexOf("-") > -1) {
      const isPlus = value.indexOf("+") > -1;
      const timespan = isPlus ? value.split("+")[1] : value.split("-")[1];
      newDate = this.getPlusMinusDate(timespan, isPlus);
    }
    return newDate.valueOf();

  }

  getNowPlusMinus(type: string, value: string) {
    let newDate = new Date()

    if (value.indexOf("+") > -1 || value.indexOf("-") > -1) {
      const isPlus = value.indexOf("+") > -1;
      const timespan = isPlus ? value.split("+")[1] : value.split("-")[1];
      newDate = this.getPlusMinusDate(timespan, isPlus);
    }

    switch (type) {
      case 'year':
        return newDate.getFullYear()
      case 'month':
        return newDate.getMonth()
      case 'day':
        return newDate.getDate()
    }

    return newDate.valueOf()
  }


  getPlusMinusDate(timespan: string, isPlus: boolean) {
    const now = new Date()

    if (timespan.indexOf("a") > -1) {
      const span = timespan.split("a")[0];
      const numberYears = Number.parseInt(span);
      const d = isPlus ? addYears(now, numberYears) : subYears(now, numberYears)
      return d;
    } else {
      return isPlus ? addDays(now, parseInt(timespan)) : subDays(now, parseInt(timespan))
    }
  }
}


