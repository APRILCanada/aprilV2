import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  constructor(@Inject(DOCUMENT) private dom: any, private router: Router) {}

  getUrl(url: any) {
    if (url != '/') {
      return 'https://www.april.ca' + url + '/';
    } else {
      return 'https://www.april.ca/';
    }
  }

  setCanonicalURL() {
    const head = this.dom.getElementsByTagName('head')[0];
    var element: HTMLLinkElement =
      this.dom.querySelector(`link[rel='canonical']`) || null;
    if (element == null) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', this.getUrl(this.router.url));
  }
}
