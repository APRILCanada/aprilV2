import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprilOnComponent } from './april-on.component';

describe('AprilOnComponent', () => {
  let component: AprilOnComponent;
  let fixture: ComponentFixture<AprilOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprilOnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprilOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
