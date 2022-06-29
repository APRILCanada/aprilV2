import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  province: string;
  constructor() {}

  set(prov: string) {
    this.province = prov;
  }

  get() {
    return this.province;
  }
}
