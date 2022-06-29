import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashquoteDemoRoutingModule } from './flashquote-demo-routing.module';
import { FlashquoteDemoComponent } from './flashquote-demo.component';


@NgModule({
  declarations: [
    FlashquoteDemoComponent
  ],
  imports: [
    CommonModule,
    FlashquoteDemoRoutingModule
  ]
})
export class FlashquoteDemoModule { }
