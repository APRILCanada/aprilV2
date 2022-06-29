import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NichesComponent } from './niches.component';

describe('NichesComponent', () => {
  let component: NichesComponent;
  let fixture: ComponentFixture<NichesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NichesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NichesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
