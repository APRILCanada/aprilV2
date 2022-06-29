import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Product } from '../../models/Product';
import { ProductsFilterPipe } from 'src/app/pipes/products-filter.pipe';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-interface-products',
  templateUrl: './interface-products.component.html',
  styleUrls: ['./interface-products.component.scss'],
  providers: [ProductsFilterPipe],
})
export class InterfaceProductsComponent implements OnInit {
  products: Product[];
  totalLength: number;
  page: number = 1;
  productValue: string;
  lang: string;

  constructor(
    private productService: ProductService,
    public language: LanguageService,
    private translate: TranslateService,
    private router: Router,
    private productsFilter: ProductsFilterPipe,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = this.productsFilter.transform(
        products,
        this.productValue
      );
      this.totalLength = this.products.length;
      this.loader.loading(false);
    });
  }

  onSearchChange(event: Event): void {
    const productValue = (event.target as HTMLInputElement)?.value
    this.productService.getProducts().subscribe((products) => {
      this.products = this.productsFilter.transform(products, productValue);
      this.totalLength = this.products.length;
      this.page = 1;
    });
  }
}
