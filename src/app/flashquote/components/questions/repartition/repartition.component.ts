// import { animate, style, transition, trigger } from '@angular/animations';
// import { Component, Input, OnInit } from '@angular/core';
// import { select, Store } from '@ngrx/store';
// import { TranslateService } from '@ngx-translate/core';
// import { FormControlState } from 'ngrx-forms';
// import { Observable } from 'rxjs';
// import { ActiveSection } from 'src/app/flashquote/models/ActiveSection';
// import { Question } from 'src/app/flashquote/models/Question';
// import { Response } from 'src/app/flashquote/models/Response';
// import { Section } from 'src/app/flashquote/models/Section';
// import { selectActiveSection, selectSections } from 'src/app/flashquote/selectors';
// import { State } from 'src/app/flashquote/store';
// import { LanguageService } from 'src/app/services/language.service';

// @Component({
//   selector: 'app-repartition',
//   templateUrl: './repartition.component.html',
//   styleUrls: ['./repartition.component.scss'],
// })
// export class RepartitionComponent implements OnInit {
//   @Input() question: Question;
//   @Input() control: FormControlState<any>;
//   @Input() error: any;
//   activeSection: ActiveSection;
//   responses: Response[] = []; // all the possible responses for this repartition
//   group$: Observable<any>;
//   controlId: any;

//   constructor(private store: Store<State>, public language: LanguageService) { }

//   ngOnInit() {
//     this.controlId = parseInt(this.control.id.slice(11, 12)) // TEMP BUG FIX

//     this.getActiveSection()

//     this.store.pipe(select(selectSections)).subscribe(sections => {
//       const section = sections.find(
//         (s: Section) => s.id === this.activeSection.id
//       )
//       const question = section.questions.find((q: Question) => {
//         return q.id === this.question.id
//       })
//       this.responses = question?.responses
//     })

//     this.group$ = this.store.pipe(
//       select((s) => (s.form.formState.controls[s.form.activeSection.id]?.controls[this.controlId] as any)?.controls[this.question.id]?.controls)
//     )
//   }

//   getActiveSection() {
//     this.store.pipe(select(selectActiveSection)).subscribe(data => this.activeSection = data)
//   }

//   getTotalPercentage() {
//     let total = 0
//     for (let i in this.control.value) total += this.control.value[i]
//     return total
//   }

// }






import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { group } from 'console';
import { FormControlState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { ActiveSection } from 'src/app/flashquote/models/ActiveSection';
import { Question } from 'src/app/flashquote/models/Question';
import { Response } from 'src/app/flashquote/models/Response';
import { Section } from 'src/app/flashquote/models/Section';
import { selectActiveSection, selectSections } from 'src/app/flashquote/selectors';
import { State } from 'src/app/flashquote/store';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-repartition',
  templateUrl: './repartition.component.html',
  styleUrls: ['./repartition.component.scss'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-30px)' }),
        animate(
          '500ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ])
  ]
})
export class RepartitionComponent implements OnInit {
  displayedColumns: string[] = ['name', 'percentage'];
  responseList: (Response | undefined)[] = []; // only the responses selected by the user
  responses: Response[] = []; // all the possible responses for this repartition
  groupOptions$: Observable<any>; // an Observable that tracks down all active inputs inside the repartition (also used to sync the UI)
  activeSection: ActiveSection;
  groupId: any;
  controlId: any;
  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any;
  public customPatterns = { '0': { pattern: new RegExp('^0*(?:[1-9][0-9]?|100)$')} };

  constructor(private store: Store<State>, public language: LanguageService, public translate: TranslateService) { }

  ngOnInit() {

    this.getActiveSection()
    const path = this.control.id.split('.')
    this.groupId = parseInt(path[2])
    this.controlId = parseInt(path[3])
    // load all the responses for the current repartition
    this.store.pipe(select(selectSections)).subscribe(sections => {
      const questions = sections.find((section: Section) => section.id == this.activeSection.id).questions
      this.responses = questions.find((q: Question) => q.id === this.question.id).responses;
    })

    // get all the current active inputs inside the repartition thanks to an Observable selector
    this.groupOptions$ = this.store.pipe(
      select((s) => {
        if ((s.form.formState.controls[this.activeSection.id]?.controls[this.groupId]?.controls as any)) {
          const group = (s.form.formState.controls[this.activeSection.id]?.controls[this.groupId]?.controls as any)[this.controlId]
          if (group)
            return group.controls
        }
      })
    );

    // update the UI in real-time - we sync the formState with the UI (remove/add an input is handled here)
    this.groupOptions$.subscribe((data: FormControlState<any>) => {
      if (data) {
        this.responseList = Object.keys(data).map((key) => this.responses.find((res) => res.responseKey === key));
      }
    });
  }

  getActiveSection() {
    this.store.pipe(select(selectActiveSection)).subscribe(data => this.activeSection = data)
  }

  /** Gets the total percentage of the repartition */
  getTotalPercentage() {
    let total = 0;
    for (let i in this.control.value) total += parseInt(this.control.value[i]);
    return total;
  }
}
