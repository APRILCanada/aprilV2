import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderInlineService } from 'src/app/flashquote/services/loader-inline.service';


@Component({
  selector: 'app-loader-inline',
  templateUrl: './loader-inline.component.html',
  styleUrls: ['./loader-inline.component.scss']
})
export class LoaderInlineComponent implements OnInit {
  isLoadingInline: boolean = false;

  subscription: Subscription;
  constructor( private loaderInline: LoaderInlineService) {
    this.subscription = this.loaderInline._loadingInline.subscribe((loadingInline) => {
      this.isLoadingInline =loadingInline;
  } )}

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
