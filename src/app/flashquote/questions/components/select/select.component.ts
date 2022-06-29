import { Component, Input } from '@angular/core';
import { FormControlState, SetValueAction } from 'ngrx-forms';
import { Question } from 'src/app/flashquote/models/Question';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';
import { Store } from '@ngrx/store';
import { Response } from 'src/app/flashquote/models/Response';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() question: Question;
  @Input() control: FormControlState<string>;
  selectedOptions: any[] = [];

  constructor(private matDialog: MatDialog, private store: Store) { }

  public get options(): any[] {
    return this.question.responses || [];
  }

  // open full screen dialog for select with more than 10 options
  openMultiSelectDialog() {
    // create a dialog config object
    const dialogConfig = new MatDialogConfig();
    // add the question and all the options (as Observable) related to this select
    dialogConfig.data = {
      question: this.question,
      options: this.question.responses,
      selectedOpts: this.selectedOptions,
    };
    dialogConfig.width = '100vw';
    dialogConfig.panelClass = 'mobile-dialog-container';
    // call the open method on the matDialog service and pass in the component to render
    // inside the dialog - returns a ref of the currently opened dialog
    const dialogRef = this.matDialog.open(SelectDialogComponent, dialogConfig);
    // when closing, the dialog passes the selected options back to the caller component
    dialogRef.afterClosed().subscribe((data) => {
      this.selectedOptions = data || this.selectedOptions || [];
      this.setControlValue();
    });
  }

  // set the selected options in the formControl value
  setControlValue() {
    let value: string[] = [];

    this.selectedOptions?.forEach((opt: Response) => {
      if (opt) value.push(opt.responseKey);
    });

    this.store.dispatch(new SetValueAction(this.control.id, value.join()));
  }

  remove(option: string): void {
    const index = this.selectedOptions.findIndex((opt) => opt.id === option);

    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    }
    this.setControlValue();
  }

  select(option: any) {
    const optionIndex = this.options.findIndex((opt) => opt.id === option.id);
    // if question does not allow multiple options, reset selectedOptions before select
    if (this.question.type !== 'MULTIPLE') this.selectedOptions = [];

    const index = this.selectedOptions.indexOf(this.options[optionIndex]);
    if (index === -1) {
      this.selectedOptions.push(this.options[optionIndex]);
    } else {
      this.selectedOptions.splice(index, 1);
    }
    this.store.dispatch(new SetValueAction(this.control.id, option.responseKey));
  }


  // apply some styles if the option is selected
  isSelected(option: string) {
    if (this.selectedOptions.length) {
      return this.selectedOptions.find((opt) => opt.id === option);
    } else return false;
  }
}
