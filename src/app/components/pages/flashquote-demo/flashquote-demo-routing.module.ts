import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashquoteDemoComponent } from './flashquote-demo.component';

const routes: Routes = [
  { path: 'flashquote-demo', component: FlashquoteDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlashquoteDemoRoutingModule {}
