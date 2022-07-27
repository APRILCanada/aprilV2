import { Location } from '@angular/common';
import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  IMultiSelectSettings,
  IMultiSelectOption,
  IMultiSelectTexts,
} from 'ngx-bootstrap-multiselect';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { MultiselectService } from 'src/app/services/multiselect.service';
import { UrlService } from 'src/app/services/url.service';
import { ContactBroker } from '../../model/ContactBroker';

declare global {
  interface Window {
    dataLayer: any;
  }
}

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
})
export class SubmissionComponent implements OnInit, OnDestroy {
  settings: IMultiSelectSettings = this.dropDown.settings;
  riskEn: IMultiSelectOption[] = this.dropDown.riskEn;
  riskFr: IMultiSelectOption[] = this.dropDown.riskFr;
  textRiskFr: IMultiSelectTexts = { defaultTitle: "Produit d'assurance" };
  textRiskEn: IMultiSelectTexts = { defaultTitle: 'Insurance product' };
  currentUrl: string;
  prevUrl: string;
  provEn: IMultiSelectOption[] = this.dropDown.provEn;
  provFr: IMultiSelectOption[] = this.dropDown.provFr;
  textProv: IMultiSelectTexts = this.dropDown.textProv;

  result: Observable<any>;
  broker: ContactBroker;
  brokerForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    province: new FormControl(null, Validators.required),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,9}'),
    ]),
    phone: new FormControl(null, Validators.required),
    insurance: new FormControl(null, Validators.required),
  });
  constructor(
    public modalService: NgbModal,
    public language: LanguageService,
    private dropDown: MultiselectService,
    private fireFunctions: AngularFireFunctions,
    private router: Router,
    private urlService: UrlService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.prevUrl = this.urlService.getPreviousUrl();
    this.currentUrl = this.router.url;
  }

  openModal(content: any, size: any) {
    this.modalService.dismissAll();
    this.modalService.open(content, {
      size: size,
      centered: true,
      backdrop: 'static',
    });
  }
  onSubmit() {
    this.broker = this.brokerForm.value;
    this.brokerForm.reset();
    // console.log(this.broker);
    const callable = this.fireFunctions.httpsCallable('sendEmailBrokerRequest');
    this.result = callable({
      email: this.broker.email,
      phone: this.broker.phone,
      firstName: this.broker.firstName,
      lastName: this.broker.lastName,
      insurance: this.broker.insurance,
      province: this.broker.province,
      language: this.language.get(),
    });
    this.result.subscribe();
  }

  close() {
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    this.location.back();
  }
}
