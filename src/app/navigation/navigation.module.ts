import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    MainNavComponent,
    MobileNavComponent,
    HamburgerComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule, TranslateModule],
  exports: [MainNavComponent, FooterComponent],
})
export class NavigationModule {}
