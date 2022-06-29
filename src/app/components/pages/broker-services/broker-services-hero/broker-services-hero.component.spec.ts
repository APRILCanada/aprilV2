import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerServicesHeroComponent } from './broker-services-hero.component';

describe('BrokerServicesHeroComponent', () => {
  let component: BrokerServicesHeroComponent;
  let fixture: ComponentFixture<BrokerServicesHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerServicesHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerServicesHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
