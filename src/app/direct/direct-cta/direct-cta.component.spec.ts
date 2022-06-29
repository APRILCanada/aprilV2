import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectCtaComponent } from './direct-cta.component';

describe('DirectCtaComponent', () => {
  let component: DirectCtaComponent;
  let fixture: ComponentFixture<DirectCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectCtaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
