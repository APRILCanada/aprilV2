import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNicheComponent } from './update-niche.component';

describe('UpdateNicheComponent', () => {
  let component: UpdateNicheComponent;
  let fixture: ComponentFixture<UpdateNicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
