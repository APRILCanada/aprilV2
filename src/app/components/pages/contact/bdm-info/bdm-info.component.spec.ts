import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmInfoComponent } from './bdm-info.component';

describe('BdmInfoComponent', () => {
  let component: BdmInfoComponent;
  let fixture: ComponentFixture<BdmInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BdmInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BdmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
