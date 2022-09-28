import { Component, Input, OnInit } from '@angular/core';
import { FormControlState, RemoveGroupControlAction, setValue, SetValueAction } from 'ngrx-forms';
import { Question } from 'src/app/flashquote/models/Question';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';
import { select, Store } from '@ngrx/store';
import { Response } from 'src/app/flashquote/models/Response';
import { LanguageService } from 'src/app/services/language.service';
import { selectActiveSection, selectFormState } from 'src/app/flashquote/selectors';
import { ActiveSection } from 'src/app/flashquote/models/ActiveSection';
import { ThisReceiver } from '@angular/compiler';
import { RemoveGroupElementAction } from 'src/app/flashquote/actions/flashquote.actions';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any;
  selectedOptions: any[] = [];
  retrieveOptions: any[] = [];
  groupPath: string;

  constructor(private matDialog: MatDialog, private store: Store, public language: LanguageService) { }

  // get all the options (Responses) for this question
  public get options(): Response[] {
    return this.question.responses || [];
  }

  // retrieve the options (Responses) selected by the user if any
  ngOnInit(): void {
    this.groupPath = this.control.id.replace(/\.[^.]*$/, '') // get the group the control to remove belongs to (ex: generic.35.0)

    if (this.control.value && this.options.length) {
      for (let currentOption of this.control.value.split(',')) {
        for (let option of this.options) {
          option.responseKey === currentOption && this.selectedOptions.push(option)
        }
      }
    } else if (this.control.value && !this.options.length) {
      for (const [index, currentOption] of this.control.value.split(',').entries()) {
        this.retrieveOptions.push({
          id: index + 1,
          label: { LabelFr: currentOption, LabelEn: currentOption },
          responseKey: currentOption,
          showOrder: index + 1
        })
      }

      // if more than 1 retrieve option, we need to reset the control because the user should be able to pick one
      if (this.retrieveOptions.length > 1)
        this.store.dispatch(new SetValueAction(this.groupPath + this.question.id, ''))
    }
    this.showSelect()
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

    // update store - returns a string of all selected options
    this.store.dispatch(new SetValueAction(this.control.id, this.selectedOptions.reduce((acc, opt) => {
      acc.push(opt.responseKey)
      return acc
    }, []).join()));
  }

  selectRetrieveOption(option: any) {
    // if only 1 retrieve option, we cannot select\deselect it
    if (this.retrieveOptions.length === 1) {
      return
    }
    const optionIndex = this.retrieveOptions.findIndex((opt) => opt.id === option.id);
    // if question does not allow multiple options, reset selectedOptions before select
    const index = this.selectedOptions.indexOf(this.retrieveOptions[optionIndex]);
    if (index === -1) {
      this.selectedOptions.push(this.retrieveOptions[optionIndex]);
    } else {
      this.selectedOptions.splice(index, 1);
    }

    // update store - returns a string of all selected options
    this.store.dispatch(new SetValueAction(this.control.id, this.selectedOptions.reduce((acc, opt) => {
      acc.push(opt.responseKey)
      return acc
    }, []).join()));
  }

  // apply some styles if the option is selected
  isSelected(option: string) {
    if (this.selectedOptions.length) {
      return this.selectedOptions.find((opt) => opt.id === option);
    } else return false;
  }

  isRetrieveOptionSelected(option: string) {
    if (this.retrieveOptions.length) {
      if (this.retrieveOptions.length === 1) return true
      else return this.selectedOptions.find((opt) => opt.id === option);
    }
    else return false;
  }

  // an optional select with 1 or less option should not appear in the store (ex: )
  showSelect() {
    if (this.retrieveOptions.length <= 1 && !this.question.isRequired) {
      this.store.dispatch(new RemoveGroupControlAction(this.groupPath, this.question.id as never))
    }
  }

}
