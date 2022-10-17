import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Console } from 'console';
import { MarkAsSubmittedAction, ResetAction } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { setActiveSection } from 'src/app/flashquote/actions/flashquote.actions';
import { ActiveSection } from 'src/app/flashquote/models/ActiveSection';
import { Section } from 'src/app/flashquote/models/Section';
import { State } from 'src/app/flashquote/store';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @Input() sections: Section[] = []
  @Input() activeSection: ActiveSection;
  @Input() errors: any;
  @Input() progress: any;

  constructor(public language: LanguageService, private store: Store<State>) { }

  ngOnInit(): void {}

  setActiveSection(sectionId: number, index: number) {
    if (this.errors['_' + this.activeSection.id] && this.activeSection.index < index) {
      return this.store.dispatch(new MarkAsSubmittedAction('generic'))
    } else if(!this.errors['_' + this.activeSection.id] && this.activeSection.index + 1 != index) return

    this.store.dispatch(setActiveSection({
      activeSection: {
        id: sectionId,
        title: this.sections.find(s => s.id == sectionId)!.title,
        isRepeat: this.sections.find(s => s.id == sectionId)!.isRepeat,
        index,
        isFirst: index === 0,
        isLast: index === this.sections.length - 1,
        isPrime: false,
        sectionsLength: this.sections.length,
        maxRepeat:this.sections.find(s => s.id == sectionId)!.maxRepeat
      }
    }))

    this.store.dispatch(new MarkAsSubmittedAction('generic'))
    this.store.dispatch(new ResetAction('generic'));
  }
}
