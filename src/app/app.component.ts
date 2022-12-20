import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { UrlService } from './services/url.service';
import { CanonicalService } from './services/canonical.service';
import { Location } from '@angular/common';
import { SeoService } from './services/seo.service';
import { LoadingService } from './services/loading.service';
import { DigitalInnovatorPriceComponent } from './components/common/digital-innovator-price/digital-innovator-price.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'APRIL Canada';
  isDirect: boolean;

  lang: string;
  previousUrl: any;
  currentUrl: any;

  prepareRoute(outlet: RouterOutlet) {
    return (outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']);
  }

  constructor(
    private translate: TranslateService,
    public language: LanguageService,
    private router: Router,
    private canonicalService: CanonicalService,
    public urlService: UrlService,
    public seo: SeoService,
    public loader: LoadingService,
    private modalService: NgbModal
  ) {
    translate.setDefaultLang(this.language.get());
  }

  ngOnInit(): void {
    this.lang = this.language.get();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.urlService.setPreviousUrl(this.previousUrl);
        if (event instanceof NavigationEnd) {
          this.canonicalService.setCanonicalURL();
          this.seo.update(this.language.get());
        }
        this.isDirect = this.currentUrl.includes('direct');
      });
    this.router.events
  .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        //this.loader.loading(true);
      });
      this.modalService.open(DigitalInnovatorPriceComponent, { size: 'xl', centered: true});
  }

  onActivate(event: any) {
    window.scroll(0, 0);
  }
}
