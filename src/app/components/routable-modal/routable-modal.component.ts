import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { filter, pairwise, takeUntil } from 'rxjs/operators';

import { SubmissionComponent } from '../common/pages/submission/submission.component';

import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-routable-modal',
  template: '',
})
export class RoutableModalComponent implements OnInit {
  destroy = new Subject<any>();
  currentDialog: any = null;
  currentUrl: string;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private loader: LoadingService
  ) {}
  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy)).subscribe((params) => {
      // When router navigates on this component is takes the params and opens up the photo detail modal
      this.route.url.forEach((x) => (this.currentUrl = x[0].path));
      if (this.currentUrl == 'soumission') {
        this.currentDialog = this.modalService.open(SubmissionComponent, {
          size: 'md',
          centered: true,
        });
      }
      this.loader.loading(false);
    });
  }
  ngOnDestroy() {
   // this.destroy.next();
  }
}
