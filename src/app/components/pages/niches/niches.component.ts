import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { Niche } from '../../firebase/models/Niche';
import { NicheService } from '../../firebase/services/niche.service';
import { ProductService } from '../../firebase/services/product.service';
import { ProductsListFilterPipe } from '../../../pipes/products-list-filter.pipe';
import { LoadingService } from 'src/app/services/loading.service';
import { Product } from '../../firebase/models/Product';
import { Subscription } from 'rxjs';

declare global {
  interface Window {
    dataLayer: any;
  }
}

@Component({
  selector: 'app-niches',
  templateUrl: './niches.component.html',
  styleUrls: ['./niches.component.scss'],
  providers: [ProductsListFilterPipe],
})
export class NichesComponent implements OnInit, OnDestroy {
  @Input() id: string;
  niches: any[];
  filteredProducts: any;
  filteredMenu: Product[];
  productList: any[] = [];
  niche: Niche = new Niche();
  products: Product[];
  nicheSub: Subscription;

  constructor(
    private nicheService: NicheService,
    private productService: ProductService,
    private route: ActivatedRoute,
    public language: LanguageService,
    private productsListFilter: ProductsListFilterPipe,
    public loader: LoadingService
  ) {}

  ngOnInit(): void {
    // getIdfromUrl
    this.nicheSub = this.route.params.subscribe((route) => {
      this.nicheService.getNiche(route['id']).subscribe((niche) => {
        this.niche = niche;
      });
      this.productService.getProducts().subscribe((products) => {
        this.filteredProducts = this.productsListFilter.transform(
          products,
          this.niche.id!
        );
      });
      window.scroll(0, 0);
      this.pushGTM();
    });
  }

  ngOnDestroy() {
    this.nicheSub.unsubscribe();
  }

  pushGTM() {
    {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'pageLoad',
        'page.language': this.language.get(),
        'page.type': 'Niches',
        'product.type': '',
        'niche.type': this.route.snapshot.params['id'],
        'filter.type': '',
      });
      // console.log(window.dataLayer);
    }
  }
}
