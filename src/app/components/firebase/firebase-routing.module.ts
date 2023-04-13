import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { InterfaceHomeComponent } from './pages/interface-home/interface-home.component';
import { CreateJobComponent } from './pages/interface-jobs/create-job/create-job.component';
import { InterfaceJobsComponent } from './pages/interface-jobs/interface-jobs.component';
import { JobDetailsComponent } from './pages/interface-jobs/job-details/job-details.component';
import { UpdateJobComponent } from './pages/interface-jobs/update-job/update-job.component';
import { InterfaceArticlesComponent } from './pages/interface-articles/interface-articles.component';
import { InterfaceNichesComponent } from './pages/interface-niches/interface-niches.component';
import { CreateNicheComponent } from './pages/interface-niches/create-niche/create-niche.component';
import { NicheDetailsComponent } from './pages/interface-niches/niche-details/niche-details.component';
import { UpdateNicheComponent } from './pages/interface-niches/update-niche/update-niche.component';
import { CreateProductComponent } from './pages/interface-products/create-product/create-product.component';
import { InterfaceProductsComponent } from './pages/interface-products/interface-products.component';
import { ProductDetailsComponent } from './pages/interface-products/product-details/product-details.component';
import { UpdateProductComponent } from './pages/interface-products/update-product/update-product.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateArticleComponent } from './pages/interface-articles/create-article/create-article.component';
import { UpdateArticleComponent } from './pages/interface-articles/update-article/update-article.component';
import { ArticleDetailsComponent } from './pages/interface-articles/article-details/article-details.component';
import { InterfaceBrokersComponent } from './pages/interface-brokers/interface-brokers.component';

const routes: Routes = [
  {
    path: "interface",
    component: InterfaceHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/login",
    component: LoginComponent
  },
  {
    path: "interface/articles",
    component: InterfaceArticlesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/create-article",
    component: CreateArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/articles/update/:id",
    component: UpdateArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/articles/details/:id",
    component: ArticleDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/niches",
    component: InterfaceNichesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/create-niche",
    component: CreateNicheComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/niches/update/:id",
    component: UpdateNicheComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/niches/details/:id",
    component: NicheDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/products",
    component: InterfaceProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/create-product",
    component: CreateProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/products/update/:id",
    component: UpdateProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/products/details/:id",
    component: ProductDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/jobs",
    component: InterfaceJobsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/create-job",
    component: CreateJobComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/jobs/update/:id",
    component: UpdateJobComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/jobs/details/:id",
    component: JobDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interface/brokers",
    component: InterfaceBrokersComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: "interface/create-job",
  //   component: CreateJobComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: "interface/jobs/update/:id",
  //   component: UpdateJobComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: "interface/jobs/details/:id",
  //   component: JobDetailsComponent,
  //   canActivate: [AuthGuard]
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class FirebaseRoutingModule { }
