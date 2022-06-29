import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivacyComponent } from '../pages/privacy/privacy.component';
import { TermsConditionsComponent } from '../pages/terms-conditions/terms-conditions.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  terms = TermsConditionsComponent;
  privacy = PrivacyComponent;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}
  openModal(component: any) {
    this.modalService.open(component, { size: 'xl', centered: true });
  }
}
