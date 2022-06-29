import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/Product';
import { LanguageService } from 'src/app/services/language.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  IMultiSelectOption,
  IMultiSelectSettings,
} from 'ngx-bootstrap-multiselect';
import { NicheService } from '../../../services/niche.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  sectionIntro: boolean = true;
  sectionFr: boolean = false;
  sectionEn: boolean = false;
  progress: number = 0;

  introCompleted: boolean = true;
  frCompleted: boolean = false;
  enCompleted: boolean = false;

  product: Product;
  nichesModel: any[];
  niches: IMultiSelectOption[];

  provincesModel: any[];
  provinces: IMultiSelectOption[];

  constructor(
    private productService: ProductService,
    private nicheService: NicheService,
    public language: LanguageService,
    private router: Router,
    private modalService: NgbModal,
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
        desc: new FormControl(null),
        target: new FormControl(null),
        coverage: new FormControl(null),
        underwriting: new FormControl(null),
        mainImgAlt: new FormControl(null),
        coverageImgAlt: new FormControl(null),
        underwritingImgAlt: new FormControl(null),
      }),
    });
    this.loader.loading(false);
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  completeIntro() {
    this.frCompleted = false;
    this.enCompleted = false;
    this.progress = 0;
    this.sectionIntro = true;
    this.sectionFr = false;
    this.sectionEn = false;
  }

  completeFr() {
    this.frCompleted = true;
    this.enCompleted = false;
    this.progress = 50;
    this.sectionIntro = false;
    this.sectionFr = true;
    this.sectionEn = false;
  }

  completeEn() {
    this.enCompleted = true;
    this.progress = 100;
    this.sectionIntro = false;
    this.sectionFr = false;
    this.sectionEn = true;
  }

  previous() {
    if (this.sectionFr == true) {
      this.sectionFr = false;
      this.sectionIntro = true;
      this.frCompleted = false;
      this.progress = 0;
    } else if (this.sectionEn == true) {
      this.sectionEn = false;
      this.sectionFr = true;
      this.enCompleted = false;
      this.progress = 50;
    }
  }

  next() {
    //  popup if error
    if (this.sectionIntro == true) {
      this.sectionIntro = false;
      this.sectionFr = true;
      this.frCompleted = true;
      this.progress = 50;
    } else if (this.sectionFr == true) {
      this.sectionFr = false;
      this.sectionEn = true;
      this.enCompleted = true;
      this.progress = 100;
    }
  }

  onSubmit() {
    this.product = this.productForm.value;
    this.productService.createProduct(this.product.id, this.product);
    this.productForm.reset();
    this.router.navigate(['/interface/products']);
  }

  send() {
    this.onSubmit();
    this.modalService.dismissAll();
  }
}
