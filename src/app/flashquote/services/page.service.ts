import { Injectable } from '@angular/core';
import * as data from '../data/pages';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  page: any;
  pages = data.pages;
  constructor() {}

  get(id: any) {
    this.page = this.pages.filter((x: any) => x.id == id);

    return this.page[0];
  }
}
