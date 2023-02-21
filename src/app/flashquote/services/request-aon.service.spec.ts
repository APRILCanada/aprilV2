import { TestBed } from '@angular/core/testing';

import { RequestAonService } from './request-aon.service';

describe('RequestAonService', () => {
  let service: RequestAonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestAonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
