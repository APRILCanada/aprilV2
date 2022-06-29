import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendResumeComponent } from './send-resume.component';

describe('SendResumeComponent', () => {
  let component: SendResumeComponent;
  let fixture: ComponentFixture<SendResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
