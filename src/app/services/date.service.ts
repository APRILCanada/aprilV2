import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor(public language: LanguageService) {}

  getDate(date: any) {
    let month;
    if (this.language.get() == 'fr') {
      switch (date?.month) {
        case 1:
          month = ' Janvier ';
          break;
        case 2:
          month = ' Février ';
          break;
        case 3:
          month = ' Mars ';
          break;
        case 4:
          month = ' Avril ';
          break;
        case 5:
          month = ' Mai ';
          break;
        case 6:
          month = ' Juin ';
          break;
        case 7:
          month = ' Juillet ';
          break;
        case 8:
          month = ' Août ';
          break;
        case 9:
          month = ' Septembre ';
          break;
        case 10:
          month = ' Octobre ';
          break;
        case 11:
          month = ' Novembre ';
          break;
        case 12:
          month = ' Décembre ';
          break;
        default:
          month = ' Janvier ';
          break;
      }
    } else {
      switch (date?.month) {
        case 1:
          month = ' January ';
          break;
        case 2:
          month = ' February ';
          break;
        case 3:
          month = ' March ';
          break;
        case 4:
          month = ' April ';
          break;
        case 5:
          month = ' May ';
          break;
        case 6:
          month = ' June ';
          break;
        case 7:
          month = ' July ';
          break;
        case 8:
          month = ' August ';
          break;
        case 9:
          month = ' September ';
          break;
        case 10:
          month = ' October ';
          break;
        case 11:
          month = ' November ';
          break;
        case 12:
          month = ' December ';
          break;
        default:
          month = ' January ';
          break;
      }
    }
    return date?.day + month + date?.year;
  }
}
