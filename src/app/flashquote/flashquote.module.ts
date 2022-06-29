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
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './questions/components/error/error.component';
import { PrimeComponent } from './prime/prime.component';
import { InputNumberFormatDirective } from './directives/input-number-format.directive';
import { LoaderComponent } from './shared/loader/loader.component';


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
    InputNumberFormatDirective,
    LoaderComponent
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
    MatTableModule,
    MatButtonModule,
    EffectsModule.forFeature([FlashquoteEffects]),
    StoreModule.forFeature(
      'form',
      reducer
    ),
  ],
  providers: [FlashquoteResolver, HttpClientModule]
})
export class FlashquoteModule { }
