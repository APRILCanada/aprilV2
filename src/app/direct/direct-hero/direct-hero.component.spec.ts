import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectHeroComponent } from './direct-hero.component';

describe('DirectHeroComponent', () => {
  let component: DirectHeroComponent;
  let fixture: ComponentFixture<DirectHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
