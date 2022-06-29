import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashquoteDemoComponent } from './flashquote-demo.component';

describe('FlashquoteDemoComponent', () => {
  let component: FlashquoteDemoComponent;
  let fixture: ComponentFixture<FlashquoteDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashquoteDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashquoteDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
