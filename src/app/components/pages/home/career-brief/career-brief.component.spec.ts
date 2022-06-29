import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerBriefComponent } from './career-brief.component';

describe('CareerBriefComponent', () => {
  let component: CareerBriefComponent;
  let fixture: ComponentFixture<CareerBriefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerBriefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
