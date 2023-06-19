import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FlashquoteRoutingModule } from './flashquote-routing.module';
import { FlashquoteEffects } from './flashquote.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FlashquoteResolver } from './flashquote.resolver';
import { reducer } from './reducers'
import { FormComponent } from './form/form.component';
import { NgrxFormsModule } from 'ngrx-forms';
import { QuestionBaseComponent } from './components/questions/question-base/question-base.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from './components/questions/input/input.component';

import { MatDialogModule, } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { SelectComponent } from './components/questions/select/select.component';
import { SelectDialogComponent } from './components/questions/select-dialog/select-dialog.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { MatButtonModule } from '@angular/material/button';
import { ChipComponent } from './components/questions/chip/chip.component';
import { RepartitionComponent } from './components/questions/repartition/repartition.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './components/shared/error/error.component';
import { PrimeComponent } from './components/shared/prime/prime.component';
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
import { BooleanComponent } from './components/questions/boolean/boolean.component';
import { DateComponent } from './components/questions/date/date.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule, } from "@angular/material/autocomplete";
import { AddressComponent } from './components/questions/address/address.component';
import { MatSelectModule } from '@angular/material/select';
import { NgrxMatSelectViewAdapter } from './shared/mat-select-view-adapter';
import { NgxMaskModule } from 'ngx-mask';
import { IdentificationComponent } from './components/questions/identification/identification.component';
import { ReclamationComponent } from './components/questions/reclamation/reclamation.component';
import { LoaderInlineComponent } from './components/shared/loader-inline/loader-inline.component';
import {  OverlayModule } from '@angular/cdk/overlay';
import { AutoComponent } from './components/questions/auto/auto.component';
import { TextareaComponent } from './components/questions/textarea/textarea.component';
import { SectionComponent } from './components/shared/section/section.component';
import { StepperComponent } from './components/shared/stepper/stepper.component';
import { ExclusionPopupComponent } from './components/shared/exclusion-popup/exclusion-popup.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HeroComponent } from './components/shared/hero/hero.component';
import { ExclusionRulesComponent } from './components/shared/exclusion-rules/exclusion-rules.component';
import { UspComponent } from './components/shared/usp/usp.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { EmailComponent } from './components/questions/email/email.component';
import { SubSectionComponent } from './components/questions/sub-section/sub-section.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactMeDialogComponent } from './components/shared/contact-me-dialog/contact-me-dialog.component';

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
    IdentificationComponent,
    NgrxMatSelectViewAdapter,
    ReclamationComponent,
    LoaderInlineComponent,
    AutoComponent,
    TextareaComponent,
    SectionComponent,
    StepperComponent,
    ExclusionPopupComponent,
    NavbarComponent,
    HeroComponent,
    ExclusionRulesComponent,
    UspComponent,
    EmailComponent,
    SubSectionComponent,
    ContactMeDialogComponent,
  ],
  imports: [
 NgbTooltipModule,
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
    MatDialogModule,
    MatSelectModule,
    NavigationModule,
    NgImageSliderModule,
    OverlayModule,
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
  ]
})
export class FlashquoteModule { }
