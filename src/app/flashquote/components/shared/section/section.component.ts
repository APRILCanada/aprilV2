import { Component, Input, OnInit } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { MarkAsSubmittedAction, ResetAction } from 'ngrx-forms';
import { filter, Observable, tap } from 'rxjs';
import { AddGroupSectionAction, setActiveSection } from 'src/app/flashquote/actions/flashquote.actions';
import { ActiveSection } from 'src/app/flashquote/models/ActiveSection';
import { BrokerDTO } from 'src/app/flashquote/models/Broker';
import { Section } from 'src/app/flashquote/models/Section';
import { selectActiveSection, selectErrors, selectFormState, selectSections } from 'src/app/flashquote/selectors';
import { State } from 'src/app/flashquote/store';
import { LanguageService } from 'src/app/services/language.service';

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
  totalGroupsInCurrentSection: number = 0;

  @Input() progress: any;
  @Input() exclusion: any;
  @Input() broker: BrokerDTO;
  @Input() formValid$: Observable<boolean>;
  @Input() formSubmitted$: Observable<boolean>;

  constructor(private store: Store<State>, private actionsSubject: ActionsSubject, public language: LanguageService) { }

  ngOnInit(): void {
    this.getErrors();
    this.getActiveSection();
    this.getSections();
  }

  getActiveSection() {
    this.store.pipe(select(selectActiveSection)).subscribe(data => this.activeSection = data)
    //this.activeSection$ = this.store.pipe(select(selectActiveSection))
  }

  getTotalGroupSection() {
    let count = 0
    this.store.pipe(select(selectFormState)).subscribe(state => {
      count = state.value[this.activeSection.id]?.length
    })
    return count
  }

  getSections() {
    this.store.pipe(select(selectSections)).subscribe((data) => {
      this.formSections = data;
    });
  }

  getErrors() {
    this.store.pipe(select(selectErrors)).subscribe(errors => {
      this.errors = errors
    })

  }

  addGroupSection() {
    this.actionsSubject.next(
      new AddGroupSectionAction(this.activeSection.id)
    )
  }
}