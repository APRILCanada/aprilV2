import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonRoutingModule } from './common-routing.module';

// Pages
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import { SubmissionComponent } from './pages/submission/submission.component';
import { BecomePartnerComponent } from './pages/become-partner/become-partner.component';

// Plugins
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Firebase
import { environment } from 'src/environments/environment';
import { FirestoreService } from '../firebase/services/firestore.service';

// Services
import { LanguageService } from 'src/app/services/language.service';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { LoaderComponent } from './loader/loader.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { CookiesBarComponent } from './cookies-bar/cookies-bar.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { QuoteBannerComponent } from './quote-banner/quote-banner.component';
import { AeroAdminComponent } from './aero-admin/aero-admin.component';
import { TestComponent } from './test/test.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';

// Exports
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    ContactFormComponent,
    SideNavComponent,
    SubmissionComponent,
    BecomePartnerComponent,

    LoaderComponent,
    TermsConditionsComponent,
    PrivacyComponent,
    CookiesBarComponent,
    MobileNavComponent,
    TestimonialsComponent,
    QuoteBannerComponent,
    AeroAdminComponent,
    TestComponent,
  ],
  imports: [
    NgbModule,
    NgxBootstrapMultiselectModule,
    CommonRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxBootstrapMultiselectModule,
    AngularFireModule.initializeApp(environment.firebase, 'APRIL Canada'),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    TranslateModule,
    HttpClientModule,
    CarouselModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],

  providers: [LanguageService, TranslateService, FirestoreService, Location],
  exports: [
    ContactFormComponent,
    LoaderComponent,
    TermsConditionsComponent,
    CookiesBarComponent,
    SideNavComponent,
    MobileNavComponent,
    TestimonialsComponent,
    QuoteBannerComponent,
    AeroAdminComponent,
  ],
})
export class CommonXModule {}
