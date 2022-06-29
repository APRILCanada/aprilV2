import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceHomeComponent } from './interface-home.component';

describe('InterfaceHomeComponent', () => {
  let component: InterfaceHomeComponent;
  let fixture: ComponentFixture<InterfaceHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfaceHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
