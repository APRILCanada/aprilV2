import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashQuoteComponent } from './flash-quote.component';

describe('FlashQuoteComponent', () => {
  let component: FlashQuoteComponent;
  let fixture: ComponentFixture<FlashQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
