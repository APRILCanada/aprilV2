import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesLocationComponent } from './offices-location.component';

describe('OfficesLocationComponent', () => {
  let component: OfficesLocationComponent;
  let fixture: ComponentFixture<OfficesLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficesLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficesLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
