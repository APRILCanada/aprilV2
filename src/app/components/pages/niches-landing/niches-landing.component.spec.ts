import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NichesLandingComponent } from './niches-landing.component';

describe('NichesLandingComponent', () => {
  let component: NichesLandingComponent;
  let fixture: ComponentFixture<NichesLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NichesLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NichesLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
