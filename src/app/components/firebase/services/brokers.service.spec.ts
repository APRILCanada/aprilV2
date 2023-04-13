import { TestBed } from '@angular/core/testing';

import { BrokerService } from './brokers.service';

describe('BrokersService', () => {
  let service: BrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
