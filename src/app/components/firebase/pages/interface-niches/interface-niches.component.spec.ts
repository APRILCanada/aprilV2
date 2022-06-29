import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceNichesComponent } from './interface-niches.component';

describe('InterfaceNichesComponent', () => {
  let component: InterfaceNichesComponent;
  let fixture: ComponentFixture<InterfaceNichesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfaceNichesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceNichesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
