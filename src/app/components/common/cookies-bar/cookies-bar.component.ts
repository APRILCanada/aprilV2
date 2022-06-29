import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookiesService } from 'src/app/services/cookies.service';
import { TermsConditionsComponent } from '../pages/terms-conditions/terms-conditions.component';

@Component({
  selector: 'app-cookies-bar',
  templateUrl: './cookies-bar.component.html',
  styleUrls: ['./cookies-bar.component.scss'],
})
export class CookiesBarComponent implements OnInit {
  constructor(public cookies: CookiesService, private modal: NgbModal) {}

  ngOnInit(): void {
    this.cookies.get();
  }

  openTerms() {
    this.modal.open(TermsConditionsComponent, { size: 'xl', centered: true });
  }
}
