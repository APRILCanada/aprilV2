import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FlashquoteRoutingModule } from './flashquote-routing.module';
import { FlashquoteEffects } from './flashquote.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FlashquoteResolver } from './flashquote.resolver';
import { reducer} from './reducers'
import { FormComponent } from './form/form.component';
import { NgrxFormsModule } from 'ngrx-forms';
import { QuestionBaseComponent } from './questions/question-base/question-base.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from './questions/components/input/input.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import { SelectComponent } from './questions/components/select/select.component';
import { SelectDialogComponent } from './questions/components/select-dialog/select-dialog.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { MatButtonModule } from '@angular/material/button';
import { ChipComponent } from './questions/components/chip/chip.component';
import { RepartitionComponent } from './questions/components/repartition/repartition.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './questions/components/error/error.component';
import { PrimeComponent } from './prime/prime.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DirectHeroComponent } from './home/direct-hero/direct-hero.component';
import { StepsComponent } from './home/steps/steps.component';
import { ExtensionsComponent } from './home/extensions/extensions.component';
import { DirectCtaComponent } from './home/direct-cta/direct-cta.component';
import { ExclusionComponent } from './home/exclusion/exclusion.component';
import { FlashQuoteComponent } from './home/flash-quote/flash-quote.component';
import { CardsComponent } from './home/flash-quote/cards/cards.component';
import { NavigationModule } from '../navigation/navigation.module';
import { BooleanComponent } from './questions/components/boolean/boolean.component';
import { DateComponent } from './questions/components/date/date.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { AddressComponent } from './questions/components/address/address.component';
import { MatSelectModule } from '@angular/material/select';
import { NgrxMatSelectViewAdapter } from './shared/mat-select-view-adapter';
import { NgxMaskModule } from 'ngx-mask';

// Exports
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    HomeComponent,
    FormComponent,
    QuestionBaseComponent,
    InputComponent,
    SelectComponent,
    SelectDialogComponent,
    SearchFilterPipe,
    ChipComponent,
    RepartitionComponent,
    ErrorComponent,
    PrimeComponent,
    LoaderComponent,
    DirectHeroComponent,
    StepsComponent,
    ExtensionsComponent,
    DirectCtaComponent,
    ExclusionComponent,
    FlashQuoteComponent,
    CardsComponent,
    BooleanComponent,
    DateComponent,
    AddressComponent,
    NgrxMatSelectViewAdapter
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FlashquoteRoutingModule,
    NgrxFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    NavigationModule,
    NgxMaskModule.forChild(),
    EffectsModule.forFeature([FlashquoteEffects]),
    StoreModule.forFeature(
      'form',
      reducer
    ),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [FlashquoteResolver, HttpClientModule]
})
export class FlashquoteModule { }
