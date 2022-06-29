import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyAprilComponent } from './why-april.component';

describe('WhyAprilComponent', () => {
  let component: WhyAprilComponent;
  let fixture: ComponentFixture<WhyAprilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyAprilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyAprilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
