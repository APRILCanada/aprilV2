import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceJobsComponent } from './interface-jobs.component';

describe('InterfaceJobsComponent', () => {
  let component: InterfaceJobsComponent;
  let fixture: ComponentFixture<InterfaceJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfaceJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
