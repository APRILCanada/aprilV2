import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceProductsComponent } from './interface-products.component';

describe('InterfaceProductsComponent', () => {
  let component: InterfaceProductsComponent;
  let fixture: ComponentFixture<InterfaceProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfaceProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
