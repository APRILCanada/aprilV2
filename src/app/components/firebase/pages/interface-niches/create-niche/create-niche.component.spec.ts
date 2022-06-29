import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNicheComponent } from './create-niche.component';

describe('CreateNicheComponent', () => {
  let component: CreateNicheComponent;
  let fixture: ComponentFixture<CreateNicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
