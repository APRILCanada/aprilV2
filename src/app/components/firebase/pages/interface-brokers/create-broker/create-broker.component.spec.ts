import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBrokerComponent } from './create-broker.component';

describe('CreateBrokerComponent', () => {
  let component: CreateBrokerComponent;
  let fixture: ComponentFixture<CreateBrokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBrokerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
