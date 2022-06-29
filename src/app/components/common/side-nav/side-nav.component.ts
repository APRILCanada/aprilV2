import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsListFilterPipe } from 'src/app/pipes/products-list-filter.pipe';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Niche } from '../../firebase/models/Niche';
import { Product } from '../../firebase/models/Product';
import { NicheService } from '../../firebase/services/niche.service';
import { ProductService } from '../../firebase/services/product.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  id: string;
  niches: any[];
  filteredProducts: any;
  filteredMenu: Product[];
  productList: any[] = [];
  niche: Niche;
  products: Product[];

  constructor(
    private nicheService: NicheService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public language: LanguageService,
    private productsListFilter: ProductsListFilterPipe,
    public loader: LoadingService
  ) {}

  ngOnInit(): void {
    // getIdfromUrl
    this.id = this.route.snapshot.params['id'];
    this.nicheService.getNiche(this.id).subscribe((niche) => {
      this.niche = niche;
      this.pushGTM();
    });

    this.productService.getProducts().subscribe((products) => {
      this.filteredProducts = this.productsListFilter.transform(
        products,
        this.niche.id!
      );
      this.products = products;
    });
    this.niches = this.nicheService.getNichesList();
  }

  getNiche(id: any) {
    this.id = id;
    this.nicheService.getNiche(this.id).subscribe((niche) => {
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
  }

  menuFilter(products: any, id: any) {
    this.filteredMenu = this.productsListFilter.transform(products, id);
    return this.filteredMenu;
  }

  pushGTM() {
    if (this.router.url === '/niches/' + this.niche.id) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'pageLoad',
        'page.language': this.language.get(),
        'page.type': 'Niches',
        'product.type': '',
        'niche.type': this.niche.id,
        'filter.type': '',
      });
      // console.log(window.dataLayer);
    }
  }
}
