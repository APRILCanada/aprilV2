import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactHeroComponent } from './contact-hero.component';

describe('ContactHeroComponent', () => {
  let component: ContactHeroComponent;
  let fixture: ComponentFixture<ContactHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
