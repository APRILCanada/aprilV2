import { Pipe, PipeTransform } from '@angular/core';

// used in QuestionSelectDialogComponent to allow filtering of the options inside the opened dialog
@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  constructor() {}

  transform(options: any[], searchTerm: string): any[] {
    searchTerm = searchTerm.toLocaleLowerCase();

    if (!options) {
      return [];
    }

    if (!searchTerm) {
      return options;
    }

    return options.filter((item) =>
      item.label.LabelEn.toLocaleLowerCase().includes(searchTerm)
    );
  }
}
