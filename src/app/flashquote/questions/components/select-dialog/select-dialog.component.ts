import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Question } from 'src/app/flashquote/models/Question';

@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrls: ['./select-dialog.component.scss'],
})
export class SelectDialogComponent implements OnInit {
  question: Question; // the current question object
  selectedOptions: any[] = []; // track the selected options
  searchText: string = ''; // the term to search in the select options dialog

  constructor(
    // injection token which allows to get access to the data passed into the dialog
    // which is made available in a data property
    @Inject(MAT_DIALOG_DATA)
    public data: {
      question: Question;
      options: any[];
      selectedOpts: any[];
    },
    // get a ref of the currently opened dialog
    private dialogRef: MatDialogRef<SelectDialogComponent>
  ) {}

  ngOnInit(): void {
    // set the question object
    this.question = this.data.question;
    this.selectedOptions = this.data.selectedOpts;
  }

  public get options(): any[] {
    return this.question.responses || [];
  }

  select(option: string) {
    const optionIndex = this.options.findIndex((opt) => opt.id === option);
    // if question does not allow multiple options, reset selectedOptions before select
    if (this.question.type !== 'MULTIPLE') this.selectedOptions = [];

    const index = this.selectedOptions.indexOf(this.options[optionIndex]);
    if (index === -1) {
      this.selectedOptions.push(this.options[optionIndex]);
    } else {
      this.selectedOptions.splice(index, 1);
    }
    // when user has selected ONE option, close the dialog
    if (this.question.type !== 'MULTIPLE') this.close();

    // reset searchText prop after searching and selecting an option
    this.searchText = '';
  }

  // close the dialog and pass the selected option back to the caller where lives the form
  close() {
    this.dialogRef.close(this.selectedOptions);
  }

  // apply some styles if the option is selected
  isSelected(option: string) {
    if (this.selectedOptions) {
      return this.selectedOptions.find((opt) => opt.id === option);
    } else return false;
  }
}
