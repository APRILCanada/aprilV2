import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceBrokersComponent } from './interface-brokers.component';

describe('InterfaceBrokersComponent', () => {
  let component: InterfaceBrokersComponent;
  let fixture: ComponentFixture<InterfaceBrokersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfaceBrokersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfaceBrokersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
