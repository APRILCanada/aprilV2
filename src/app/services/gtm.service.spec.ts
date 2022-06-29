import { TestBed } from '@angular/core/testing';

import { gtmService } from './gtm.service';

describe('gtmService', () => {
  let service: gtmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(gtmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
