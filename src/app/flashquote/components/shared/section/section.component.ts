import { Component, Input, OnInit } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { MarkAsSubmittedAction, ResetAction } from 'ngrx-forms';
import { filter, Observable, tap } from 'rxjs';
import { AddGroupSectionAction, setActiveSection } from 'src/app/flashquote/actions/flashquote.actions';
import { ActiveSection } from 'src/app/flashquote/models/ActiveSection';
import { Section } from 'src/app/flashquote/models/Section';
import { selectActiveSection, selectErrors, selectSections } from 'src/app/flashquote/selectors';
import { State } from 'src/app/flashquote/store';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  activeSection$: Observable<ActiveSection>;
  activeSection: ActiveSection;
  formSections: Section[] = [];
  initialSectionValue: any;
  errors: any;
  @Input() progress: any;
  @Input() formValid$: Observable<boolean>;
  @Input() formSubmitted$: Observable<boolean>;

  constructor(private store: Store<State>, private actionsSubject: ActionsSubject) { }

  ngOnInit(): void {
    this.getActiveSection();
    this.getSections()
    this.getErrors()

    console.log('LENGTH', this.activeSection.sectionsLength)
  }

  getActiveSection() {
    this.store.pipe(select(selectActiveSection)).subscribe(data => this.activeSection = data)
    this.activeSection$ = this.store.pipe(select(selectActiveSection))
  }

  getSections() {
    this.store.pipe(select(selectSections)).subscribe((data) => {
      this.formSections = data;
    });
  }

  getErrors() {
    this.errors = this.store.pipe(select(selectErrors)).subscribe(errors => {
      this.errors = errors
    })

  }

  setActiveSection(step: number) {
    if (this.errors['_' + this.activeSection.id] && step === 1) {
      return this.store.dispatch(new MarkAsSubmittedAction('generic'))
    }

    this.store.dispatch(setActiveSection({
      activeSection: {
        id: this.formSections[this.activeSection.index + step].id,
        title: this.formSections[this.activeSection.index + step].title,
        isRepeat: this.formSections[this.activeSection.index + step].isRepeat,
        index: this.activeSection.index + step,
        isFirst: this.activeSection.index + step === 0,
        isLast: this.activeSection.index + step === this.formSections.length - 1,
        sectionsLength: this.formSections.length,
        maxRepeat: this.activeSection.maxRepeat
      }
    }))

    this.store.dispatch(new MarkAsSubmittedAction('generic'))
    this.store.dispatch(new ResetAction('generic'));
  }

  addGroupSection() {
    this.actionsSubject.next(
      new AddGroupSectionAction(this.activeSection.id)
    )
  }
}