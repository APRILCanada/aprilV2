import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../services/language.service';
import { ProvinceModalComponent } from './province-modal/province-modal.component';
import { ProvinceService } from './services/province.service';

@Component({
  selector: 'app-direct',
  templateUrl: './direct.component.html',
  styleUrls: ['./direct.component.scss'],
})
export class DirectComponent implements OnInit, AfterContentInit {
  id: string;

  @ViewChild('provinceTemplate') provinceTemplate: ElementRef;

  constructor(
    private province: ProvinceService,
    private modal: NgbModal,
    private route: ActivatedRoute,
    private language: LanguageService
  ) {}

  ngOnInit(): void {
    // this.modal.open(ProvinceModalComponent, { size: 'md', centered: true });
    this.setProvince('QC');

    this.id = this.route.snapshot.params['id'];

    if (
      this.id === 'contractor' ||
      this.id === 'contractors' ||
      this.id === 'landscaper' ||
      this.id === 'carpenter' ||
      this.id === 'painter' ||
      this.id === 'interior-system-installer' ||
      this.id === 'bricklayer' ||
      this.id === 'electrician'
    ) {
      this.language.set('en');
    }
  }

  ngAfterContentInit() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageLoad',
      'page.language': this.language.get(),
      'page.type': 'direct',
      'direct.type': this.id,
      'niche.type': '',
      'product.type': '',
      'filter.type': '',
    });
    // console.log(window.dataLayer);
  }

  setProvince(string: string) {
    this.province.set(string);
  }
}
