import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineFormsHeroComponent } from './offline-forms-hero.component';

describe('OfflineFormsHeroComponent', () => {
  let component: OfflineFormsHeroComponent;
  let fixture: ComponentFixture<OfflineFormsHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineFormsHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineFormsHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
