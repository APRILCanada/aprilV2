import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsListFilterPipe } from 'src/app/pipes/products-list-filter.pipe';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Niche } from '../../firebase/models/Niche';
import { Product } from '../../firebase/models/Product';
import { NicheService } from '../../firebase/services/niche.service';
import { ProductService } from '../../firebase/services/product.service';

@Component({
  selector: 'app-niches-landing',
  templateUrl: './niches-landing.component.html',
  styleUrls: ['./niches-landing.component.scss'],
  providers: [ProductsListFilterPipe],
})
export class NichesLandingComponent implements OnInit {
  id: string;
  product: any = new Product();
  products: Product[];
  filteredProducts: any[];
  provinces: string[] = [];
  niche: Niche;
  niches: any[];
  filteredMenu: Product[];

  constructor(
    private productService: ProductService,
    private nicheService: NicheService,
    private route: ActivatedRoute,
    public language: LanguageService,
    private productsListFilter: ProductsListFilterPipe,
    private renderer: Renderer2,
    public loader: LoadingService
  ) {}

  ngOnInit(): void {
    // getIdfromUrl
    this.id = this.route.snapshot.params['id'];
    this.productService.getProducts().subscribe((products) => {
      this.products = products.filter(p => p.isActive == 'isActive');
      console.log(this.products)
      this.product = this.products.find((x) => x.id == this.id);
      this.filteredProducts = this.productsListFilter.transform(
        products,
        this.product?.parent
      );
      this.pushGTM();
    });
    this.niches = this.nicheService.getNichesList();
    this.loader.loading(false);
  }

  menuFilter(products: any, id: any) {
    this.filteredMenu = this.productsListFilter.transform(products, id);
    return this.filteredMenu;
  }

  /**getNiche(id) {
    this.id = id;
    this.nicheService.getNiche(this.id).subscribe((niche) => {
      this.niche = niche;
    });
    this.productService.getProducts().subscribe((products) => {
      this.filteredProducts = this.productsListFilter.transform(
        products,
        this.niche.id
      );
    });
    window.scroll(0, 0);
    this.pushGTM();
  }
**/
  pushGTM() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageLoad',
      'page.language': this.language.get(),
      'page.type': 'Niches Landing',
      'niche.type': '',
      'product.type': '',
      'filter.type': '',
    });
    // console.log(window.dataLayer);
  }
}
