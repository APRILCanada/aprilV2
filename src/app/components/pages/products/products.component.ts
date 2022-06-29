import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsListFilterPipe } from 'src/app/pipes/products-list-filter.pipe';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Niche } from '../../firebase/models/Niche';
import { Product } from '../../firebase/models/Product';
import { NicheService } from '../../firebase/services/niche.service';
import { ProductService } from '../../firebase/services/product.service';

declare global {
  interface Window {
    dataLayer: any;
  }
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsListFilterPipe],
})
export class ProductsComponent implements OnInit, AfterViewChecked {
  nicheS = {
    en: '',
    fr: '',
  };

  @ViewChildren('lists') lists: QueryList<ElementRef>;

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
      this.products = products;
      this.product = this.products.find((x) => x.id == this.id);
      this.filteredProducts = this.productsListFilter.transform(
        products,
        this.product.parent
      );
      console.log(this.product);

      this.getNicheString(this.product.parent.toString());
      this.pushGTM();
    });
    this.niches = this.nicheService.getNichesList();
  }

  ngAfterViewChecked() {
    this.lists.forEach((item) => {
      item.nativeElement.querySelectorAll('li').forEach((item: any) => {
        this.renderer.setStyle(item, 'padding-bottom', '0.5rem');
      });
      item.nativeElement.querySelectorAll('ul').forEach((item: any) => {
        this.renderer.setStyle(item, 'margin-bottom', '0');
      });
    });
  }

  menuFilter(products: any, id: any) {
    this.filteredMenu = this.productsListFilter.transform(products, id);
    return this.filteredMenu;
  }

  switchProduct(id: any) {
    this.id = id;
    this.product = this.products.find((x) => x.id == this.id);
    window.scroll(0, 0);
    this.getNicheString(this.product.parent.toString());

    this.pushGTM();
  }

  getPreposition(province: any) {
    if (province == 'IPE' || province == 'TN') {
      return 'à';
    } else if (province == 'QC' || province == 'MB' || province == 'NB') {
      return 'au';
    } else {
      return 'en';
    }
  }

  getNicheString(string: any) {
    switch (string) {
      case 'residentiel':
        this.nicheS.en = 'Residential';
        this.nicheS.fr = 'résidentiel';
        break;
      case 'transport':
        this.nicheS.en = 'Personal and commercial automobile';
        this.nicheS.fr = 'Automobile personnelle et commerciale';
        break;
      case 'professionals-businesses':
        this.nicheS.en = 'Professionals & Businesses';
        this.nicheS.fr = 'professionnels et entreprises';
        break;
      case 'marine-plaisance':
        this.nicheS.en = 'Personal Marine';
        this.nicheS.fr = 'Marine de plaisance';
        break;
      case 'commercial-realty':
        this.nicheS.en = 'Commercial Realty';
        this.nicheS.fr = 'Immobilier commercial';
        break;
      case 'commercial-marine':
        this.nicheS.en = 'Logistics and Commercial Marine';
        this.nicheS.fr = 'Logistique et Marine commerciale';
        break;
      case 'april-construction':
        this.nicheS.en = 'APRIL Construction';
        this.nicheS.fr = 'APRIL Construction';
        break;
      default:
        this.nicheS.en = 'previous page';
        this.nicheS.fr = 'la page précédente';
        break;
    }
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

  pushGTM() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageLoad',
      'page.language': this.language.get(),
      'page.type': 'Produits',
      'niche.type': this.product.parent[0],
      'product.type': this.product.id,
      'filter.type': '',
    });
    // console.log(window.dataLayer)
  }
}
