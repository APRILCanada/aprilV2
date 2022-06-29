import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashFormComponent } from './flash-form.component';

describe('FlashFormComponent', () => {
  let component: FlashFormComponent;
  let fixture: ComponentFixture<FlashFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
