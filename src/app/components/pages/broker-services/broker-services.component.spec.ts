import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerServicesComponent } from './broker-services.component';

describe('BrokerServicesComponent', () => {
  let component: BrokerServicesComponent;
  let fixture: ComponentFixture<BrokerServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
