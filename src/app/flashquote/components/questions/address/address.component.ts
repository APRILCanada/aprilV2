import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FormControlState, SetValueAction } from 'ngrx-forms';
import { debounceTime, Observable, pluck, switchMap, tap } from 'rxjs';
import { ActiveSection } from 'src/app/flashquote/models/ActiveSection';
import { Question } from 'src/app/flashquote/models/Question';
import { selectActiveSection, selectErrors } from 'src/app/flashquote/selectors';
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
  errors$: Observable<any>;
  activeSection: ActiveSection;
  showError: boolean = false;

  group$: Observable<any>
  showAddressForm = true;
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
    // console.log('identifier',this.question.identifier)
    if(Object.values(this.control.value).reduce((acc: string, curr) => acc += curr, '') !== '') {
      this.showAddressForm = true;
      this.addressAutoCompleteHidden = true;
    }

    this.group$ = this.store.pipe(
      select((s) => (s.form.formState.controls[s.form.activeSection.id].controls[0] as any).controls[this.question.id]?.controls)
    )

    this.errors$ = this.store.pipe(select(selectErrors));

    this.store.pipe(select(selectActiveSection)).subscribe((data) => {
      this.activeSection = data;
    });

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
            "search": '',
            [`${this.question.identifier}-Street`]: addressResult['street'] || '',
            [`${this.question.identifier}-PostalCode`]: addressResult['postalCode'] || '',
            [`${this.question.identifier}-City`]: addressResult['city'] || '',
            [`${this.question.identifier}-StreetNumber`]: addressResult['houseNumber'] || '',
            [`${this.question.identifier}-Province`]: addressResult['state'] || '',
            [`${this.question.identifier}-Unit`]: ''
          }));
        }
      });
    }
  }

  resetAddress() {
    this.addressAutoCompleteHidden = false
    this.store.dispatch(new SetValueAction(this.control.id, {
      "search": '',
      [`${this.question.identifier}-Street`]: '',
      [`${this.question.identifier}-PostalCode`]: '',
      [`${this.question.identifier}-City`]: '',
      [`${this.question.identifier}-StreetNumber`]: '',
      [`${this.question.identifier}-Province`]: '',
      [`${this.question.identifier}-Unit`]: ''
    }));
  }

  showEmptyForm() {
    this.addressAutoCompleteHidden = true;
    this.showAddressForm = true
  }
}
