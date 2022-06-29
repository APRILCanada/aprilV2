import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as data from '../../assets/seo';
import { SeoData } from '../components/pages/models/seoData';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  data = data;
  seo = data.seoData;
  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {}

  getUrl(url: any) {
    if (url != '/') {
      return 'https://www.april.ca' + url + '/';
    } else {
      return 'https://www.april.ca/';
    }
  }

  getSeoData(lang: any) {
    let url = this.getUrl(this.router.url);
    if (lang === 'fr') {
      return this.seo.fr.filter((x) => x.url == url)[0];
    } else {
      return this.seo.en.filter((x) => x.url == url)[0];
    }
  }

  update(lang: any) {
    let seoData = this.getSeoData(lang);
    if (seoData?.title) {
      this.titleService.setTitle(seoData.title);
    }

    if (seoData?.description) {
      this.metaService.updateTag({
        name: 'description',
        content: seoData.description,
      });
    } else {
      this.metaService.removeTag("name='description'");
    }

    if (seoData?.keyword) {
      this.metaService.updateTag({
        name: 'keyword',
        content: seoData.keyword,
      });
    } else {
      this.metaService.removeTag("name='keyword'");
    }

    if (seoData?.ogLocale) {
      this.metaService.updateTag({
        name: 'og:locale',
        content: seoData.ogLocale,
      });
    } else {
      this.metaService.removeTag("name='og:locale'");
    }

    if (seoData?.ogType) {
      this.metaService.updateTag({
        name: 'og:type',
        content: seoData.ogType,
      });
    } else {
      this.metaService.removeTag("name='og:type'");
    }

    if (seoData?.ogTitle) {
      this.metaService.updateTag({
        property: 'og:title',
        content: seoData.ogTitle,
      });
    } else {
      this.metaService.removeTag("property='og:title'");
    }

    if (seoData?.ogDescription) {
      this.metaService.updateTag({
        property: 'og:description',
        content: seoData.ogDescription,
      });
    } else {
      this.metaService.removeTag("property='og:description'");
    }

    if (seoData?.ogUrl) {
      this.metaService.updateTag({
        property: 'og:url',
        content: seoData.ogUrl,
      });
    } else {
      this.metaService.updateTag({
        property: 'og:url',
        content: this.router.url,
      });
    }

    if (seoData?.ogSiteName) {
      this.metaService.updateTag({
        property: 'og:site_name',
        content: seoData.ogSiteName,
      });
    } else {
      this.metaService.removeTag("property='og:site_name'");
    }

    if (seoData?.ogArticleAuthor) {
      this.metaService.updateTag({
        property: 'og:article:author',
        content: seoData.ogArticleAuthor,
      });
    } else {
      this.metaService.removeTag("property='og:article:author'");
    }

    if (seoData?.ogImage) {
      this.metaService.updateTag({
        property: 'og:image',
        content: seoData.ogImage,
      });
    } else {
      this.metaService.removeTag("property='og:image'");
    }

    if (seoData?.ogImageType) {
      this.metaService.updateTag({
        property: 'og:image:type',
        content: seoData.ogImageType,
      });
    } else {
      this.metaService.removeTag("property='og:image:type'");
    }

    if (seoData?.ogImageTypeAlt) {
      this.metaService.updateTag({
        property: 'og:image:alt',
        content: seoData.ogImageTypeAlt,
      });
    } else {
      this.metaService.removeTag("property='og:image:alt'");
    }

    if (seoData?.ogImageTypeAlt) {
      this.metaService.updateTag({
        property: 'og:image:alt',
        content: seoData.ogImageTypeAlt,
      });
    } else {
      this.metaService.removeTag("property='og:image:alt'");
    }

    if (seoData?.ogImageTypeSecure) {
      this.metaService.updateTag({
        property: 'og:image:secure_url',
        content: seoData.ogImageTypeSecure,
      });
    } else {
      this.metaService.removeTag("property='og:image:secure_url'");
    }

    if (seoData?.ogImageWidth) {
      this.metaService.updateTag({
        property: 'og:image:width',
        content: seoData.ogImageWidth,
      });
    } else {
      this.metaService.removeTag("property='og:image:width'");
    }

    if (seoData?.ogImageHeight) {
      this.metaService.updateTag({
        property: 'og:image:height',
        content: seoData.ogImageHeight,
      });
    } else {
      this.metaService.removeTag("property='og:image:height'");
    }

    if (seoData?.twitterCard) {
      this.metaService.updateTag({
        property: 'twitter:card',
        content: seoData.twitterCard,
      });
    } else {
      this.metaService.removeTag("property='twitter:card'");
    }

    if (seoData?.twitterTitle) {
      this.metaService.updateTag({
        property: 'twitter:title',
        content: seoData.twitterTitle,
      });
    } else {
      this.metaService.removeTag("property='twitter:title'");
    }

    if (seoData?.twitterDescription) {
      this.metaService.updateTag({
        property: 'twitter:description',
        content: seoData.twitterDescription,
      });
    } else {
      this.metaService.removeTag("property='twitter:description'");
    }

    if (seoData?.twitterSite) {
      this.metaService.updateTag({
        property: 'twitter:site',
        content: seoData.twitterSite,
      });
    } else {
      this.metaService.removeTag("property='twitter:site'");
    }

    if (seoData?.twitterImage) {
      this.metaService.updateTag({
        property: 'twitter:image',
        content: seoData.twitterImage,
      });
    } else {
      this.metaService.removeTag("property='twitter:image'");
    }
  }
}
