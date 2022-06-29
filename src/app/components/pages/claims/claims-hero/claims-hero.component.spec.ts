import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsHeroComponent } from './claims-hero.component';

describe('ClaimsHeroComponent', () => {
  let component: ClaimsHeroComponent;
  let fixture: ComponentFixture<ClaimsHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
