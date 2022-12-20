import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalInnovatorPriceComponent } from './digital-innovator-price.component';

describe('DigitalInnovatorPriceComponent', () => {
  let component: DigitalInnovatorPriceComponent;
  let fixture: ComponentFixture<DigitalInnovatorPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalInnovatorPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalInnovatorPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
