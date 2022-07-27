import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SubmissionComponent } from '../common/pages/submission/submission.component';

import { LoadingService } from 'src/app/services/loading.service';
import { PrivacyComponent } from '../common/pages/privacy/privacy.component';
import { TermsConditionsComponent } from '../common/pages/terms-conditions/terms-conditions.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-routable-modal',
  template: '',
})
export class RoutableModalComponent implements OnInit {
  currentDialog: any = null;
  currentUrl: string;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private loader: LoadingService,
    private location: Location
  ) {}
  ngOnInit() {
    this.route.params.pipe().subscribe((params) => {
      // When router navigates on this component is takes the params and opens up modal
      this.route.url.forEach((x) => (this.currentUrl = x[0].path));
      if (this.currentUrl == 'soumission') {
        this.currentDialog = this.modalService.open(SubmissionComponent, {
          size: 'md',
          centered: true,
        });
      }
      if (this.currentUrl == 'confidentialite') {
        this.currentDialog = this.modalService.open(PrivacyComponent, {
          size: 'xl',
          centered: true,
        });
      }
      if (this.currentUrl == 'conditions') {
        this.currentDialog = this.modalService.open(TermsConditionsComponent, {
          size: 'xl',
          centered: true,
        });
      }
      this.loader.loading(false);
    });
  }
  ngOnDestroy() {}
}
