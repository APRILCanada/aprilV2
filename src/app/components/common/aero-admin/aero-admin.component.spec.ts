import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeroAdminComponent } from './aero-admin.component';

describe('AeroAdminComponent', () => {
  let component: AeroAdminComponent;
  let fixture: ComponentFixture<AeroAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeroAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeroAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
