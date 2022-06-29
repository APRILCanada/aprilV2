import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutableModalComponent } from './routable-modal.component';

describe('RoutableModalComponent', () => {
  let component: RoutableModalComponent;
  let fixture: ComponentFixture<RoutableModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutableModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
