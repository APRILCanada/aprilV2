import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AeroAdminComponent } from './components/common/aero-admin/aero-admin.component';
import { TestComponent } from './components/common/test/test.component';

// Pages
import { AboutComponent } from './components/pages/about/about.component';
import { BrokerServicesComponent } from './components/pages/broker-services/broker-services.component';
import { CareerComponent } from './components/pages/career/career.component';
import { ClaimsComponent } from './components/pages/claims/claims.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NewsDetailComponent } from './components/pages/news-detail/news-detail.component';
import { NewsComponent } from './components/pages/news/news.component';
import { NichesLandingComponent } from './components/pages/niches-landing/niches-landing.component';
import { NichesComponent } from './components/pages/niches/niches.component';
import { OfflineFormsComponent } from './components/pages/offline-forms/offline-forms.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { RoutableModalComponent } from './components/routable-modal/routable-modal.component';
import { PrimeComponent } from './flashquote/prime/prime.component';

const childrenRoutes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'a-propos',
    component: AboutComponent,
  },
  {
    path: 'services',
    component: BrokerServicesComponent,
  },
  {
    path: 'carriere',
    component: CareerComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'actualites',
    component: NewsComponent,
  },
  {
    path: 'actualites/:id',
    component: NewsDetailComponent,
  },
  {
    path: 'niches',
    component: NichesLandingComponent,
  },
  {
    path: 'niches/:id',
    component: NichesComponent,
  },
  {
    path: 'formulaires',
    component: OfflineFormsComponent,
  },
  {
    path: 'produits/:id',
    component: ProductsComponent,
  },
  {
    path: '404',
    component: ErrorComponent,
  },
  {
    path: 'soumission',
    component: RoutableModalComponent,
    outlet: 'modals',
  },
  {
    path: 'confidentialite',
    component: RoutableModalComponent,
    outlet: 'modals',
  },
  {
    path: 'conditions',
    component: RoutableModalComponent,
    outlet: 'modals',
  },
  {
    path: 'reclamation',
    component: ClaimsComponent,
  },
  {
    path: 'aero-admin',
    component: AeroAdminComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'fr',
    component: HomeComponent,
  },
  {
    path: 'en',
    component: HomeComponent,
  },
];
const routes: Routes = [
  ...childrenRoutes,
  ...[
    // {
    //   path: 'direct/:id',
    //   loadChildren: () =>
    //     import('./direct/direct.module').then((m) => m.DirectModule),
    // },
     {
      path: 'direct/:id',
      loadChildren: () =>
        import('./flashquote/flashquote.module').then(
          (m) => m.FlashquoteModule
        )
    },
    // {
    //   path: 'prime',
    //   component: PrimeComponent,
    //   data: { animation: 'prime' },
    // },
    {
      path: '',
      loadChildren: () =>
        import('./components/common/common.module').then(
          (m) => m.CommonXModule
        ),
    },

    {
      path: '',
      loadChildren: () =>
        import('./components/firebase/firebase.module').then(
          (m) => m.FirebaseModule
        ),
    },
    {
      path: '**',
      redirectTo: '/404',
    },
  ],
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

