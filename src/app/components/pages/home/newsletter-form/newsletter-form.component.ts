import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import {
  IMultiSelectOption,
  IMultiSelectSettings,
  IMultiSelectTexts,
} from 'ngx-bootstrap-multiselect';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MultiselectService } from 'src/app/services/multiselect.service';
import { NewsLetter } from '../model/NewsLetter';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Component({
  selector: 'app-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.scss'],
})
export class NewsletterFormComponent implements OnInit {
  newsLetterForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,9}'),
    ]),
    name: new FormControl(null, Validators.required),
    province: new FormControl(null, Validators.required),
    lang: new FormControl(null, Validators.required),
  });
  newsLetter: NewsLetter;
  result: Observable<any>;

  langEn: IMultiSelectOption[] = this.dropdown.langEn;
  langFr: IMultiSelectOption[] = this.dropdown.langFr;
  provEn: IMultiSelectOption[] = this.dropdown.provEn;
  provFr: IMultiSelectOption[] = this.dropdown.provFr;
  textFr: IMultiSelectTexts = { defaultTitle: 'Langue' };
  textEn: IMultiSelectTexts = { defaultTitle: 'Language' };
  textProv: IMultiSelectTexts = this.dropdown.textProv;
  settings: IMultiSelectSettings = this.dropdown.whiteSettings;

  constructor(
    public language: LanguageService,
    private modalService: NgbModal,
    private fireFunctions: AngularFireFunctions,
    private dropdown: MultiselectService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.newsLetter = this.newsLetterForm.value;
    // console.log('Sent')
    // console.log(this.newsLetter)

    const callable = this.fireFunctions.httpsCallable('subscribeNewsletter');
    this.result = callable({
      email: this.newsLetter.email,
      province: this.newsLetter.province,
      fullName: this.newsLetter.name,
      language: this.newsLetter.lang,
    });
    this.result.subscribe();

    this.newsLetterForm.reset();
  }

  close() {
    this.modalService.dismissAll();
  }
  openModal(content: any) {
    this.modalService.open(content, { size: 'md', centered: true });
  }
}
