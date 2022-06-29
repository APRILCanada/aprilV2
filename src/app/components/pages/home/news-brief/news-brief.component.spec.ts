import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsBriefComponent } from './news-brief.component';

describe('NewsBriefComponent', () => {
  let component: NewsBriefComponent;
  let fixture: ComponentFixture<NewsBriefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsBriefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
