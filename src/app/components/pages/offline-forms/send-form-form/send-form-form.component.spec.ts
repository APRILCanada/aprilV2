import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendFormFormComponent } from './send-form-form.component';

describe('SendFormFormComponent', () => {
  let component: SendFormFormComponent;
  let fixture: ComponentFixture<SendFormFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendFormFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendFormFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
