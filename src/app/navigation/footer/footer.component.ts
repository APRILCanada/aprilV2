import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivacyComponent } from 'src/app/components/common/pages/privacy/privacy.component';
import { TermsConditionsComponent } from 'src/app/components/common/pages/terms-conditions/terms-conditions.component';

@Component({
  selector: 'app-new-footer',
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

  scrollToSection(section: any) {
    if (section === '3 easy steps') {
      document.getElementById('3Steps')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    } else if (section === 'Meet With Us') {
      document.getElementById('Meet')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    } else {
      document.getElementById('Form')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}
