import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMeDialogComponent } from './contact-me-dialog.component';

describe('ContactMeDialogComponent', () => {
  let component: ContactMeDialogComponent;
  let fixture: ComponentFixture<ContactMeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactMeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactMeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
