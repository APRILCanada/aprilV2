import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-me-dialog',
  templateUrl: './contact-me-dialog.component.html',
  styleUrls: ['./contact-me-dialog.component.scss']
})
export class ContactMeDialogComponent implements OnInit {

  constructor(private modaleService: NgbModal) { }

  ngOnInit(): void {
  }

  close(){
    this.modaleService.dismissAll();
  }
}
