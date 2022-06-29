import { Location } from '@angular/common';
import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  IMultiSelectOption,
  IMultiSelectTexts,
  IMultiSelectSettings,
} from 'ngx-bootstrap-multiselect';
import { LanguageService } from 'src/app/services/language.service';
import { MultiselectService } from 'src/app/services/multiselect.service';
import { Partner } from '../../model/Partner';

declare global {
  interface Window {
    dataLayer: any;
  }
}

@Component({
  selector: 'app-become-partner',
  templateUrl: './become-partner.component.html',
  styleUrls: ['./become-partner.component.scss'],
})
export class BecomePartnerComponent implements OnInit, AfterContentInit {
  provEn: IMultiSelectOption[] = this.dropDown.provEn;
  provFr: IMultiSelectOption[] = this.dropDown.provFr;
  textProv: IMultiSelectTexts = this.dropDown.textProv;
  settings: IMultiSelectSettings = this.dropDown.settings;

  partner: Partner;
  fileName: string;
  partnerForm: FormGroup = new FormGroup({
    broker: new FormControl(null),
    certificateNumber: new FormControl(null, Validators.required),
    address: new FormGroup({
      unit: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      province: new FormControl(null, Validators.required),
      postalCode: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
    }),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,9}'),
    ]),
    billingContact: new FormControl(null, Validators.required),
    file: new FormControl(null, Validators.required),
    insurer: new FormControl(null, Validators.required),
    policyNumber: new FormControl(null, Validators.required),
    limit: new FormControl(null, Validators.required),
    newsLetter: new FormControl(false),
  });

  constructor(
    public modalService: NgbModal,
    public language: LanguageService,
    private dropDown: MultiselectService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  ngAfterContentInit() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageLoad',
      'page.language': this.language.get(),
      'page.type': 'Devenir Partenaire',
      'niche.type': '',
      'product.type': '',
      'filter.type': '',
    });
    // console.log(window.dataLayer);
  }

  onSubmit() {
    this.partner = this.partnerForm.value;
    // console.log('Sent')
    // console.log(this.partner)
    this.partnerForm.reset();
    // this.router.navigate(['/interface/jobs'])
  }

  close() {
    this.modalService.dismissAll();
    this.location.back();
  }

  openModal(content: any) {
    this.modalService.dismissAll();
    this.modalService.open(content, { size: 'md', centered: true });
  }

  fileProgress(fileInput: any) {
    let file = fileInput.target.files[0];
    this.fileName = file.name;
  }
}
