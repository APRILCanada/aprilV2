import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Plugins
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';

// Components
import { CareerComponent } from './components/pages/career/career.component';
import { BrokerServicesComponent } from './components/pages/broker-services/broker-services.component';
import { OfflineFormsComponent } from './components/pages/offline-forms/offline-forms.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { CareerHeroComponent } from './components/pages/career/career-hero/career-hero.component';
import { ValuesComponent } from './components/pages/career/values/values.component';
import { LifeComponent } from './components/pages/career/life/life.component';
import { OfficesComponent } from './components/pages/career/offices/offices.component';
import { WhyAprilComponent } from './components/pages/career/why-april/why-april.component';
import { JobOffersComponent } from './components/pages/career/job-offers/job-offers.component';
import { SendResumeComponent } from './components/pages/career/send-resume/send-resume.component';
import { BrokerServicesHeroComponent } from './components/pages/broker-services/broker-services-hero/broker-services-hero.component';
import { AdvantagesComponent } from './components/pages/broker-services/advantages/advantages.component';
import { AprilOnComponent } from './components/pages/broker-services/april-on/april-on.component';
import { SnapComponent } from './components/pages/broker-services/snap/snap.component';
import { OfflineFormsHeroComponent } from './components/pages/offline-forms/offline-forms-hero/offline-forms-hero.component';
import { SendFormFormComponent } from './components/pages/offline-forms/send-form-form/send-form-form.component';
import { FormListComponent } from './components/pages/offline-forms/form-list/form-list.component';
import { ContactHeroComponent } from './components/pages/contact/contact-hero/contact-hero.component';
import { OfficesLocationComponent } from './components/pages/contact/offices-location/offices-location.component';
import { BdmInfoComponent } from './components/pages/contact/bdm-info/bdm-info.component';
import { FaqComponent } from './components/pages/contact/faq/faq.component';
import { TeamComponent } from './components/pages/about/team/team.component';
import { StatisticsComponent } from './components/pages/about/statistics/statistics.component';
import { AboutHeroComponent } from './components/pages/about/about-hero/about-hero.component';
import { CareerBriefComponent } from './components/pages/home/career-brief/career-brief.component';
import { NewsletterFormComponent } from './components/pages/home/newsletter-form/newsletter-form.component';
import { NewsBriefComponent } from './components/pages/home/news-brief/news-brief.component';
import { HomeHeroComponent } from './components/pages/home/home-hero/home-hero.component';

import { NewsComponent } from './components/pages/news/news.component';
import { NewsDetailComponent } from './components/pages/news-detail/news-detail.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { NichesComponent } from './components/pages/niches/niches.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { MainNavComponent } from './components/common/main-nav/main-nav.component';
import { UpperNavComponent } from './components/common/upper-nav/upper-nav.component';
import { NicheService } from './components/firebase/services/niche.service';
import { environment } from 'src/environments/environment';
import { ProductsListFilterPipe } from './pipes/products-list-filter.pipe';
import { ArticlesListFilterPipe } from './pipes/articles-list-filter.pipe';
import { CommonXModule } from './components/common/common.module';
import { CarouselComponent } from './components/pages/home/carousel/carousel.component';
import { RiskFilterPipe } from './pipes/risk-filter.pipe';
import { RoutableModalComponent } from './components/routable-modal/routable-modal.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { ResumeComponent } from './components/pages/career/resume/resume.component';
import { CityFilterPipe } from './pipes/city-filter.pipe';
import { JobListComponent } from './components/pages/career/job-offers/job-list/job-list.component';
import { NichesLandingComponent } from './components/pages/niches-landing/niches-landing.component';
import { ClaimsComponent } from './components/pages/claims/claims.component';
import { ClaimsHeroComponent } from './components/pages/claims/claims-hero/claims-hero.component';
import { NavigationModule } from './navigation/navigation.module';
import { FlashquoteDemoModule } from './components/pages/flashquote-demo/flashquote-demo.module';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ImgixAngularModule } from '@imgix/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { MatAutocompleteModule, MAT_AUTOCOMPLETE_SCROLL_STRATEGY, MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY } from '@angular/material/autocomplete';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';



registerLocaleData(en);
// import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

// Exports
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    RiskFilterPipe,
    AppComponent,
    CareerComponent,
    BrokerServicesComponent,
    OfflineFormsComponent,
    ContactComponent,
    HomeComponent,
    AboutComponent,
    CareerHeroComponent,
    ValuesComponent,
    LifeComponent,
    OfficesComponent,
    WhyAprilComponent,
    JobOffersComponent,
    SendResumeComponent,
    BrokerServicesHeroComponent,
    AdvantagesComponent,
    AprilOnComponent,
    SnapComponent,
    OfflineFormsHeroComponent,
    SendFormFormComponent,
    FormListComponent,
    ContactHeroComponent,
    OfficesLocationComponent,
    BdmInfoComponent,
    FaqComponent,
    TeamComponent,
    StatisticsComponent,
    AboutHeroComponent,
    CareerBriefComponent,
    NewsletterFormComponent,
    NewsBriefComponent,
    HomeHeroComponent,
    NewsComponent,
    NewsDetailComponent,
    ProductsComponent,
    NichesComponent,
    UpperNavComponent,
    MainNavComponent,
    FooterComponent,
    ProductsListFilterPipe,
    ArticlesListFilterPipe,
    CarouselComponent,
    RoutableModalComponent,
    ErrorComponent,
    ResumeComponent,
    CityFilterPipe,
    JobListComponent,
    NichesLandingComponent,
    ClaimsComponent,
    ClaimsHeroComponent
  ],
  imports: [
    FlashquoteDemoModule,
    CommonXModule,
    NavigationModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    NgbModule,
    OverlayModule,
    MatAutocompleteModule,
    MatDialogModule,
    HttpClientModule,
    MatSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxScrollTopModule,
    NgxBootstrapMultiselectModule,
    NgxMaskModule.forRoot(),
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase, 'APRIL Canada'),
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    ScullyLibModule.forRoot({ useTransferState: true, alwaysMonitor: false, manualIdle: true }),
    ImgixAngularModule.forRoot({
      domain: "april.imgix.net",
      defaultImgixParams: {
        // This enables the auto format and compress imgix parameters by default for all images, which we recommend to reduce image size, but you might choose to turn this off.
        auto: 'format,compress,enhance',
        sharp: 30
      }
    }),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    ScullyLibModule,
  ],
  providers: [{
    provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY
  }, {
    provide: MAT_DIALOG_DEFAULT_OPTIONS,
    useValue: { hasBackdrop: true }
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
