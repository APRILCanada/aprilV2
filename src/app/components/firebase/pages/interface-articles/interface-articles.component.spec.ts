import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceArticlesComponent } from './interface-articles.component';

describe('InterfaceArticlesComponent', () => {
  let component: InterfaceArticlesComponent;
  let fixture: ComponentFixture<InterfaceArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfaceArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
