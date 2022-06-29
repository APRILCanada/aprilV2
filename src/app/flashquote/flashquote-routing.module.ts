import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashquoteResolver } from './flashquote.resolver';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { flashquote: FlashquoteResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [FlashquoteResolver]
})
export class FlashquoteRoutingModule {}