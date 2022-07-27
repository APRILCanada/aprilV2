import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit, OnDestroy {
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
