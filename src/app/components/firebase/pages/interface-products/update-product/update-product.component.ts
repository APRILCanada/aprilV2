import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/Product';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import {
  IMultiSelectOption,
  IMultiSelectSettings,
} from 'ngx-bootstrap-multiselect';
import { NicheService } from '../../../services/niche.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
  providers: [ProductService],
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup;
  provinces: IMultiSelectOption[];
  niches: IMultiSelectOption[];

  id: string;
  product: Product = {
    id: '',
    parent: '',
    provinces: '',
    isActive: '',
    mainImg: '',
    coverageImg: '',
    underwritingImg: '',
    fr: {
      title: '',
      desc: '',
      target: '',
      coverage: '',
      underwriting: '',
      mainImgAlt: '',
      coverageImgAlt: '',
      underwritingImgAlt: '',
    },
    en: {
      title: '',
      desc: '',
      target: '',
      coverage: '',
      underwriting: '',
      mainImgAlt: '',
      coverageImgAlt: '',
      underwritingImgAlt: '',
    },
  };

  constructor(
    private productService: ProductService,
    private nicheService: NicheService,
    private router: Router,
    private route: ActivatedRoute,
    public language: LanguageService,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.niches = this.nicheService.getNichesList();

    this.provinces = [
      { id: 'QC', name: 'Québec' },
      { id: 'ON', name: 'Ontario' },
      { id: 'SK', name: 'Saskatchewan' },
      { id: 'MB', name: 'Manitoba' },
      { id: 'AB', name: 'Alberta' },
      { id: 'BC', name: 'Colombie-Britannique' },
      { id: 'IPE', name: 'Ile du Prince-Édouard' },
      { id: 'NB', name: 'Nouveau-Brunswick' },
      { id: 'NE', name: 'Nouvelle-Écosse' },
      { id: 'TN', name: 'Terre-Neuve et Labrador' },
    ];
    // getIdfromUrl
    this.id = this.route.snapshot.params['id'];
    this.productService.getProduct(this.id).subscribe((product) => {
      this.product = product;
      this.loader.loading(false);
    });

    this.productForm = new FormGroup({
      id: new FormControl(null),
      parent: new FormControl(null),
      provinces: new FormControl(null),
      isActive: new FormControl(null),
      mainImg: new FormControl(null),
      coverageImg: new FormControl(null),
      underwritingImg: new FormControl(null),

      en: new FormGroup({
        title: new FormControl(null),
        provinces: new FormControl(null),
        desc: new FormControl(null),
        target: new FormControl(null),
        coverage: new FormControl(null),
        underwriting: new FormControl(null),
        mainImgAlt: new FormControl(null),
        coverageImgAlt: new FormControl(null),
        underwritingImgAlt: new FormControl(null),
      }),

      fr: new FormGroup({
        title: new FormControl(null),
        provinces: new FormControl(null),
        desc: new FormControl(null),
        target: new FormControl(null),
        coverage: new FormControl(null),
        underwriting: new FormControl(null),
        mainImgAlt: new FormControl(null),
        coverageImgAlt: new FormControl(null),
        underwritingImgAlt: new FormControl(null),
      }),
    });
  }

  onSubmit() {
    this.product.id = this.productForm.value.id || this.product.id;
    this.product.parent = this.productForm.value.parent || this.product.parent;
    this.product.provinces =
      this.productForm.value.provinces || this.product.provinces;
    this.product.isActive =
      this.productForm.value.isActive || this.product.isActive;
    this.product.mainImg =
      this.productForm.value.mainImg || this.product.mainImg;
    this.product.coverageImg =
      this.productForm.value.coverageImg || this.product.coverageImg;
    this.product.underwritingImg =
      this.productForm.value.underwritingImg || this.product.underwritingImg;
    this.product.fr.title =
      this.productForm.value.fr.title || this.product.fr.title;
    this.product.fr.desc =
      this.productForm.value.fr.desc || this.product.fr.desc;
    this.product.fr.target =
      this.productForm.value.fr.target || this.product.fr.target;
    this.product.fr.coverage =
      this.productForm.value.fr.coverage || this.product.fr.coverage;
    this.product.fr.underwriting =
      this.productForm.value.fr.underwriting || this.product.fr.underwriting;
    this.product.fr.mainImgAlt =
      this.productForm.value.fr.mainImgAlt || this.product.fr.mainImgAlt;
    this.product.fr.coverageImgAlt =
      this.productForm.value.fr.coverageImgAlt ||
      this.product.fr.coverageImgAlt;
    this.product.fr.underwritingImgAlt =
      this.productForm.value.fr.underwritingImgAlt ||
      this.product.fr.underwritingImgAlt;
    this.product.en.title =
      this.productForm.value.en.title || this.product.en.title;
    this.product.en.desc =
      this.productForm.value.en.desc || this.product.en.desc;
    this.product.en.target =
      this.productForm.value.en.target || this.product.en.target;
    this.product.en.coverage =
      this.productForm.value.en.coverage || this.product.en.coverage;
    this.product.en.underwriting =
      this.productForm.value.en.underwriting || this.product.en.underwriting;
    this.product.en.mainImgAlt =
      this.productForm.value.en.mainImgAlt || this.product.en.mainImgAlt;
    this.product.en.coverageImgAlt =
      this.productForm.value.en.coverageImgAlt ||
      this.product.en.coverageImgAlt;
    this.product.en.underwritingImgAlt =
      this.productForm.value.en.underwritingImgAlt ||
      this.product.en.underwritingImgAlt;

    this.productService.updateProduct(this.product);
    this.router.navigate(['/interface/products/details/' + this.product.id]);
    // popup thank you
  }
}
