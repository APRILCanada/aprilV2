import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProvinceService } from '../services/province.service';

@Component({
  selector: 'app-province-modal',
  templateUrl: './province-modal.component.html',
  styleUrls: ['./province-modal.component.scss'],
})
export class ProvinceModalComponent implements OnInit {
  constructor(public province: ProvinceService, public modal: NgbModal) {}

  ngOnInit(): void {}

  setProvince(prov: string) {
    this.province.set(prov);
    this.modal.dismissAll();
  }
}
