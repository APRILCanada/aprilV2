import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseRoutingModule } from './firebase-routing.module';
import { RouterModule } from '@angular/router';

// Plugins
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';

// Pages
import { InterfaceArticlesComponent } from './pages/interface-articles/interface-articles.component';
import { CreateArticleComponent } from './pages/interface-articles/create-article/create-article.component';
import { ArticleDetailsComponent } from './pages/interface-articles/article-details/article-details.component';
import { UpdateArticleComponent } from './pages/interface-articles/update-article/update-article.component';
import { InterfaceProductsComponent } from '../../components/firebase/pages/interface-products/interface-products.component';
import { CreateProductComponent } from './pages/interface-products/create-product/create-product.component';
import { ProductDetailsComponent } from './pages/interface-products/product-details/product-details.component';
import { UpdateProductComponent } from './pages/interface-products/update-product/update-product.component';
import { InterfaceNichesComponent } from '../../components/firebase/pages/interface-niches/interface-niches.component';
import { NicheDetailsComponent } from './pages/interface-niches/niche-details/niche-details.component';
import { UpdateNicheComponent } from './pages/interface-niches/update-niche/update-niche.component';
import { CreateNicheComponent } from './pages/interface-niches/create-niche/create-niche.component';
import { InterfaceHomeComponent } from './pages/interface-home/interface-home.component';
import { InterfaceJobsComponent } from '../../components/firebase/pages/interface-jobs/interface-jobs.component';
import { CreateJobComponent } from './pages/interface-jobs/create-job/create-job.component'
import { UpdateJobComponent } from './pages/interface-jobs/update-job/update-job.component';
import { JobDetailsComponent } from './pages/interface-jobs/job-details/job-details.component';
import { LoginComponent } from './pages/login/login.component';

// Services
import { AuthService } from './services/auth.service';
import { FirestoreService } from './services/firestore.service';
import { HrService } from './services/hr.service';
import { ProductService } from './services/product.service';
import { NicheService } from './services/niche.service';
import { ArticleService } from './services/article.service';
import { LanguageService } from 'src/app/services/language.service';

// Pipe
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { ProductsFilterPipe } from 'src/app/pipes/products-filter.pipe';
import { NichesFilterPipe } from 'src/app/pipes/niches-filter.pipe';
import { ArticlesFilterPipe } from 'src/app/pipes/articles-filter.pipe';


// Firebase
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { InterfaceBrokersComponent } from './pages/interface-brokers/interface-brokers.component';
import { CreateBrokerComponent } from './pages/interface-brokers/create-broker/create-broker.component';
import { BrokerDetailsComponent } from './pages/interface-brokers/broker-details/broker-details.component';

// Exports
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
export let options: Partial<IConfig> | (() => Partial<IConfig>);




@NgModule({
  declarations: [
    InterfaceArticlesComponent,
    InterfaceProductsComponent,
    InterfaceNichesComponent,
    InterfaceJobsComponent,
    InterfaceHomeComponent,
    CreateJobComponent,
    UpdateJobComponent,
    JobDetailsComponent,
    LoginComponent,
    SearchFilterPipe,
    ProductsFilterPipe,
    NichesFilterPipe,
    ArticlesFilterPipe,
    CreateProductComponent,
    ProductDetailsComponent,
    UpdateProductComponent,
    CreateNicheComponent,
    NicheDetailsComponent,
    UpdateNicheComponent,
    CreateArticleComponent,
    ArticleDetailsComponent,
    UpdateArticleComponent,
    InterfaceBrokersComponent,
    CreateBrokerComponent,
    BrokerDetailsComponent
  ],
  imports: [
    RouterModule,
    NgbModule,
    NgxScrollTopModule,
    NgxMaskModule,
    NgxPaginationModule,
    CommonModule,
    FirebaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'APRIL Canada'),
    AngularFireAuthModule, 
    AngularFirestoreModule,
    TranslateModule,
    HttpClientModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
        }),
    NgxBootstrapMultiselectModule,
  ],
  
  providers: [
    AuthService,
    FirestoreService,
    HrService,
    ProductService,
    NicheService,
    LanguageService,
    TranslateService,
    ArticleService
  ],
})
export class FirebaseModule { }
