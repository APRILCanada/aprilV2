import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashWidgetComponent } from './flash-widget.component';

describe('FlashWidgetComponent', () => {
  let component: FlashWidgetComponent;
  let fixture: ComponentFixture<FlashWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
