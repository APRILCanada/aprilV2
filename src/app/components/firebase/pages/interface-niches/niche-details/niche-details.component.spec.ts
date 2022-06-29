import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NicheDetailsComponent } from './niche-details.component';

describe('NicheDetailsComponent', () => {
  let component: NicheDetailsComponent;
  let fixture: ComponentFixture<NicheDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NicheDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NicheDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
