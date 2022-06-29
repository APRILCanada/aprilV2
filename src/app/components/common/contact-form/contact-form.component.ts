import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
//import { AngularFireFunctions } from '@angular/fire/functions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  IMultiSelectOption,
  IMultiSelectTexts,
  IMultiSelectSettings,
} from 'ngx-bootstrap-multiselect';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { MultiselectService } from 'src/app/services/multiselect.service';
import { Contact } from '../model/Contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  result: Observable<any>;
  result2: Observable<any>;
  contact: Contact;
  contactForm: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,9}'),
    ]),
    phone: new FormControl(null, Validators.required),
    province: new FormControl(null, Validators.required),
    language: new FormControl(null, Validators.required),
    message: new FormControl(null, Validators.required),
    newsLetter: new FormControl(false),
  });

  langEn: IMultiSelectOption[] = this.dropdown.langEn;
  langFr: IMultiSelectOption[] = this.dropdown.langFr;
  provEn: IMultiSelectOption[] = this.dropdown.provEn;
  provFr: IMultiSelectOption[] = this.dropdown.provFr;
  textFr: IMultiSelectTexts = { defaultTitle: 'Langue de préférence' };
  textEn: IMultiSelectTexts = { defaultTitle: 'Preferred language' };
  textProv: IMultiSelectTexts = this.dropdown.textProv;
  settings: IMultiSelectSettings = this.dropdown.settings;

  constructor(
    public language: LanguageService,
    private modalService: NgbModal,
    public router: Router,
    private fireFunctions: AngularFireFunctions,
    private dropdown: MultiselectService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.contact = this.contactForm.value;

    const callable = this.fireFunctions.httpsCallable('emailContactForm');
    this.result = callable({
      email: this.contact.email,
      province: this.contact.province,
      firstName: this.contact.firstName,
      lastName: this.contact.lastName,
      language: this.contact.language,
      phone: this.contact.phone,
      message: this.contact.message,
    });
    this.result.subscribe();

    if (this.contact.newsLetter) {
      const callable = this.fireFunctions.httpsCallable('subscribeNewsletter');
      this.result2 = callable({
        email: this.contact.email,
        province: this.contact.province,
        fullName: this.contact.firstName + ' ' + this.contact.lastName,
        language: this.contact.language,
      });
      this.result2.subscribe();
    }

    this.contactForm.reset();
  }

  close() {
    this.modalService.dismissAll();
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'md', centered: true });
  }
}
