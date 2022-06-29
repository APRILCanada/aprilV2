import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectRoutingModule } from './direct-routing.module';
import { DirectComponent } from './direct.component';
import { DirectHeroComponent } from './direct-hero/direct-hero.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlashQuoteComponent } from './flash-quote/flash-quote.component';

import { NavigationModule } from '../navigation/navigation.module';
import { StepsComponent } from './steps/steps.component';
import { ExtensionsComponent } from './extensions/extensions.component';
import { DirectCtaComponent } from './direct-cta/direct-cta.component';
import { ExclusionComponent } from './exclusion/exclusion.component';
import { ProvinceModalComponent } from './province-modal/province-modal.component';
import { FlashWidgetComponent } from './flash-widget/flash-widget.component';
import { FlashFormComponent } from './flash-form/flash-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { NgxMaskModule } from 'ngx-mask';
import { CardsComponent } from './flash-quote/cards/cards.component';

@NgModule({
  declarations: [
    DirectComponent,
    DirectHeroComponent,
    FlashQuoteComponent,
    StepsComponent,
    ExtensionsComponent,
    DirectCtaComponent,
    ExclusionComponent,
    ProvinceModalComponent,
    FlashWidgetComponent,
    FlashFormComponent,
    CardsComponent,
  ],
  imports: [
    CommonModule,
    DirectRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    NavigationModule,
    NgxBootstrapMultiselectModule,
    NgxMaskModule.forRoot(),
  ],
})
export class DirectModule {}
