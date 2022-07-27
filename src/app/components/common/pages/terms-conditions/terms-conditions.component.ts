import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
})
export class TermsConditionsComponent implements OnInit, OnDestroy {
  constructor(
    private modalService: NgbModal,
    private location: Location,
    public language: LanguageService
  ) {}

  ngOnInit(): void {}

  close() {
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    this.location.back();
  }
}
