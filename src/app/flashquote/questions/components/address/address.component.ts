import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FormControlState } from 'ngrx-forms';
import { BehaviorSubject, debounceTime, Observable, switchMap, tap } from 'rxjs';
import { Question } from 'src/app/flashquote/models/Question';
import { AddressService } from 'src/app/flashquote/services/address.service';
import { State } from 'src/app/flashquote/store';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any;
  search$: Observable<any>

  constructor(public translate: TranslateService, private store: Store<State>, private addressService: AddressService) { }

  PROVINCE = [
    "AB",
    "BC",
    "MB",
    "ON",
    "QC",
    "SK"
  ]

  @ViewChild('unit') unitElement: ElementRef;

  _validating: boolean = false;

  @Input() public set isValidating(value) {
    if (value == true) {
      this.addressAutoCompleteHidden = true;
    }
    this._validating = value;
  }

  public get isValidating() {
    return this._validating;
  }

  @Output() onValueChange = new EventEmitter();
  @Output() focus = new EventEmitter();

  identifier: string = "";

  addressAutoCompleteHidden: boolean = false;
  isLoading = false;
  suggestions: any[];

  ngOnInit() {
    this.search$ = this.store.pipe(
      select((s) => s.form.formState.controls[this.question.id].value)
    );
    this.search$.pipe(
      debounceTime(500),
      tap(() => {
        this.suggestions = [];
        this.isLoading = true;
      }),
      switchMap(value => this.addressService.getAutoComplete(value))
    ).subscribe({
      next: data => {
        console.log('data address', data)
        this.suggestions = data['suggestions']
        this.isLoading = false
      },
      error: err => {
        this.suggestions = []
        this.isLoading = false;
      }
    })
  }

  getAddressLabel(suggestion: any): string {
    let address = suggestion["address"];
    let houseNumber = !address.houseNumber ? '' : `${address.houseNumber}, `;
    let street = !address.street ? '' : `${address.street}, `;
    let city = !address.city ? '' : `${address.city}, `;
    let state = !address.state ? '' : `${address.state}, `;
    let countryPostalCode = !address.postalCode ? 'Canada' : `Canada, ${address.postalCode}`;
    return `${houseNumber}${street}${city}${state}${countryPostalCode}`;
  }
}
