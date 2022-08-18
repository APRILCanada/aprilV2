import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FormControlState, SetValueAction } from 'ngrx-forms';
import { debounceTime,  Observable, pluck, switchMap, tap } from 'rxjs';
import { Question } from 'src/app/flashquote/models/Question';
import { AddressService } from 'src/app/flashquote/services/address.service';
import { State } from 'src/app/flashquote/store';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any;

  group$: Observable<any>
  showAddressForm = false;
  addressAutoCompleteHidden = false;
  isLoading = false;
  suggestions: any[];

  constructor(
    public translate: TranslateService,
    private store: Store<State>,
    private addressService: AddressService,
    public language: LanguageService
  ) { }

  ngOnInit() {
    this.group$ = this.store.pipe(
      select((s) => s.form.formState.controls[this.question.id].controls)
    );

    this.group$.pipe(
      pluck('search', 'value'),
      debounceTime(500),
      tap(() => {
        this.suggestions = [];
        this.isLoading = true;
      }),
      switchMap(value => this.addressService.getAutoComplete(value))
    ).subscribe({
      next: data => {
        this.suggestions = data['suggestions']
        this.isLoading = false
      },
      error: () => {
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

  optionSelected(locationId: string) {
    if (locationId) {
      this.showAddressForm = true;
      this.addressAutoCompleteHidden = true;

      this.addressService.getLocationDetails(locationId).subscribe({
        next: addressResult => {
          this.store.dispatch(new SetValueAction(this.control.id, {
            search: '',
            street: addressResult['street'] || '',
            postalCode: addressResult['postalCode'] || '',
            city: addressResult['city'] || '',
            houseNumber: addressResult['houseNumber'] || '',
            state: addressResult['state'] || '',
            unit: ''
          }));
        }
      });
    }
  }

  resetAddress() {
    this.addressAutoCompleteHidden = false
    this.store.dispatch(new SetValueAction(this.control.id, {
      search: '',
      street: '',
      postalCode: '',
      city: '',
      houseNumber: '',
      state: '',
      unit: ''
    }));
  }

  showEmptyForm() {
    this.addressAutoCompleteHidden = true;
    this.showAddressForm = true
  }
}
