import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { Question } from '../models/Question';
import { FormGroupState, MarkAsSubmittedAction, ResetAction, SetValueAction } from 'ngrx-forms';
import { distinct, distinctUntilChanged, distinctUntilKeyChanged, filter, map, pluck, skipLast, skipWhile, switchMap, take, takeLast, takeWhile, tap } from 'rxjs/operators';
import { FormValue, State } from '../store';
import { ActionService } from '../services/action.service';
import { Answer } from '../models/Answer';
import { FlashquoteService } from '../services/flashquote.service';
import { formLoaded, RemoveGroupSectionAction, setActiveSection, setPrime, SetSubmittedValueAction } from '../actions/flashquote.actions';
import {
  selectSections,
  selectFormState,
  selectSubmittedValue,
  selectErrors,
  selectFormValid,
  selectFormSubmitted,
  selectBroker,
  selectActiveSection,
  selectProgress,
  selectForm,
  selectPrime,
} from '../selectors';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { Section } from '../models/Section';
import { ActiveSection } from '../models/ActiveSection'
import { loadBroker } from '../actions/broker.actions';
import { BrokerDTO } from '../models/Broker';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterContentChecked {
  sections: Section[];
  // questions: Question[];
  questionsBySection?: Question[];
  activeSection: ActiveSection;
  errors$: Observable<any>;
  errors: any;
  formState$: Observable<any>;
  prime$: Observable<any>;
  formValid$: Observable<boolean>;
  formSubmitted$: Observable<boolean>;
  submittedValue$: Observable<FormValue | undefined>;
  submittingForm = false;
  answers: Answer[];
  formSubscription: Subscription;
  broker: BrokerDTO;
  initialQuestionNumber: number = 0;
  progress: number = 0;
  primeReady = false;
  quoteResult: any;
  lang: string;


  constructor(
    private store: Store<State>,
    private actionService: ActionService,
    private flashquoteService: FlashquoteService,
    private router: Router,
    public language: LanguageService,
    private cdr: ChangeDetectorRef,
    private actionsSubject: ActionsSubject
  ) { }

  // keep input focused in for loop: https://github.com/ngrx/store/issues/176
  customTrackBy(index: number): any {
    return index;
  }

  customTrackByTwo(index: number): any {
    return index;
  }


  ngOnInit() {
    this.lang = this.language.get()
    this.getFormState();
    this.getSections();
    this.getActiveSection();
    this.getSubmittedValue();
    this.getFormValid();
    this.getFormSubmitted();
    this.getErrors();
    this.getBroker();
    this.getSelectProgress()
    this.getPrime();

    this.onFormChange();

  }

  //https://stackoverflow.com/questions/34364880/expression-has-changed-after-it-was-checked
  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  // ngOnDestroy() {
  //   this.formSubscription.unsubscribe();
  // }


  onFormChange() {
    this.formState$.pipe(
      // get fields of current active section
      map((sections) => sections.controls[this.activeSection.id]),
      distinctUntilChanged()
    ).subscribe(section => {
      if (section) {
        // get all the questions of this section with the section Id
        this.questionsBySection = this.sections.find(section => section.id == this.activeSection.id)?.questions
        // get all keys for each group in this section
        for (let group of section.controls) {
          for (let key in group.controls) {
            const question = this.questionsBySection?.find((q) => q.id === parseInt(key));

            // validate rules if question has any
            if (question && this.hasRules(question)) {
              this.actionService.validate(question, group.controls[key], group.id);
            }
          }
        }
      }
    })
  }

  getBroker() {
    this.store.pipe(select(selectBroker)).subscribe(broker => {
      this.broker = broker
    })
  }

  getActiveSection() {
    this.store.pipe(select(selectActiveSection)).subscribe((activeSection) => {
      this.activeSection = activeSection;
    });
  }

  getSections() {
    this.store.pipe(select(selectSections)).subscribe((data) => {
      this.sections = data;
    });
  }

  getErrors() {
    this.errors$ = this.store.pipe(select(selectErrors));
    this.store.pipe(select(selectErrors)).subscribe(errors => {
      this.errors = errors
    })
  }

  getSelectProgress() {
    this.store.pipe(select(selectProgress)).subscribe(progress => {
      if (progress > this.initialQuestionNumber) {
        this.initialQuestionNumber = progress
      }
      this.progress = ((this.initialQuestionNumber - progress) / this.initialQuestionNumber) * (100 + (33))
    })
  }

  getFormState() {
    this.formState$ = this.store.pipe(select(selectFormState));
  }

  getPrime() {
    this.prime$ = this.store.pipe(select(selectPrime));
  }

  getFormValid() {
    this.formValid$ = this.store.pipe(select(selectFormValid));
    //this.store.pipe(select(selectFormValid)).subscribe(data => console.log('FORM VALID', data))
  }

  getFormSubmitted() {
    this.formSubmitted$ = this.store.pipe(select(selectFormSubmitted));
  }

  getSubmittedValue() {
    this.submittedValue$ = this.store.pipe(select(selectSubmittedValue));
  }

  //check if a question has rules
  hasRules(question: Question) {
    return question.rules.length ? true : false;
  }

  removeGroupSection(sectionId: number, index: number) {
    this.actionsSubject.next(
      new RemoveGroupSectionAction(sectionId, index)
    )
  }

  setActiveSection(step: number) {
    window.scrollTo(0, 700);

    if (this.errors['_' + this.activeSection.id] && step === 1) {
      return this.store.dispatch(new MarkAsSubmittedAction('generic'))
    }

    const newSection = this.sections[this.activeSection.index + step]

    this.store.dispatch(setActiveSection({
      activeSection: {
        id: newSection.id,
        title: newSection.title,
        isRepeat: newSection.isRepeat,
        index: this.activeSection.index + step,
        isFirst: this.activeSection.index + step === 0,
        isLast: this.activeSection.index + step === this.sections.length - 1,
        isPrime: false,
        sectionsLength: this.sections.length,
        maxRepeat: newSection.maxRepeat
      }
    }))

    this.store.dispatch(new MarkAsSubmittedAction('generic'))
    this.store.dispatch(new ResetAction('generic'));
  }

  formatDate(value: string) {
    const date = new Date(value);
    let year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate() + 1;

    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return day + '-' + month + '-' + year
  }


  submit() {
    this.formState$
      .pipe(
        take(1),
        filter((state) => {
          return state.isValid;
        }),
        map((form) => {
          this.submittingForm = true;

          let allAnswers: any[] = []
          // LOOP OVER EACH SECTION [{}, {}]
          for (let sectionKey in form.value) {
            const questionsSection = this.sections.filter((s: Section) => s.id === parseInt(sectionKey))[0].questions
            const sectionIsRepeat = this.sections.filter((s: Section) => s.id === parseInt(sectionKey))[0].isRepeat

            // LOOP OVER EACH GROUP INSIDE A SECTION
            const answers = form.value[sectionKey].reduce((answers: Answer[], groupSection: any, index: number) => {

              const i = index + 1

              for (let key in groupSection) {
                const identifier = questionsSection.find((q: Question) => q.id === parseInt(key))?.identifier
                const questionType = questionsSection.find((q: Question) => q.id === parseInt(key))?.type

                if (identifier && questionType)
                  if (typeof groupSection[key] === 'object') {
                    for (let subKey in groupSection[key]) {
                      let value = groupSection[key][subKey]

                      if (questionType === 'REPARTITION') {
                        value = (value / 100).toString()
                      }

                      if (questionType === 'DATE') {
                        value = this.formatDate(value)
                      }

                      answers.push(new Answer(
                        sectionIsRepeat ? key + '_' + i : key,
                        sectionKey,
                        value,
                        sectionIsRepeat ? subKey + '-' + i : subKey
                      ))
                    }
                  } else {
                    let value = groupSection[key]

                    if (questionType === 'DATE') {
                      value = this.formatDate(value)
                    }

                    answers.push(new Answer(
                      sectionIsRepeat ? key + '_' + i : key,
                      sectionKey,
                      value,
                      sectionIsRepeat ? identifier + '-' + i : identifier
                    ))
                  }
              }
              return answers
            }, [])

            allAnswers = [...allAnswers, ...answers]
          }

          const formData = {
            Code: this.broker.aprilonId,
            MarketId: this.broker.marketId,
            Language: this.language.get(),
            Answers: allAnswers,
          };
          
          return new SetSubmittedValueAction(formData);
        })
      ).subscribe(this.store)

    this.submittedValue$.subscribe((data) => {
      console.log('QUOTE DATA', JSON.stringify(data))

      this.store.dispatch(formLoaded({ isFormLoaded: false }))
      if (data) {
        window.scrollTo(0, 700);
        // setTimeout(() => {
        //   this.store.dispatch(setActiveSection({
        //     activeSection: {
        //       id: this.sections.length,
        //       title: { LabelEn: 'Your estimated prime', LabelFr: 'Votre prime estimée' },
        //       isRepeat: false,
        //       index: this.sections.length,
        //       isFirst: false,
        //       isLast: false,
        //       isPrime: true,
        //       sectionsLength: this.sections.length,
        //       maxRepeat: 0
        //     }
        //   }))

        //   this.submittingForm = false;


        //   this.store.dispatch(formLoaded({ isFormLoaded: true }))
        //   this.store.dispatch(new MarkAsSubmittedAction('generic'))
        //   this.store.dispatch(new ResetAction('generic'));
        // }, 5000)

        this.flashquoteService.submitQuote(data).subscribe({
          next: quoteResult => {
            this.quoteResult = quoteResult
            console.log('QUOTE RESULT', quoteResult)
            if (quoteResult) {
              this.store.dispatch(setActiveSection({
                activeSection: {
                  id: this.sections.length,
                  title: { LabelEn: 'Your estimated prime', LabelFr: 'Votre prime estimée' },
                  isRepeat: false,
                  index: this.sections.length,
                  isFirst: false,
                  isLast: false,
                  isPrime: true,
                  sectionsLength: this.sections.length,
                  maxRepeat: 0
                }
              }))

              // set prime
              this.formState$.subscribe(formValue => {
                this.store.dispatch(setPrime({ marketId: this.broker.marketId, formValue, prime: quoteResult.total.premium }))
              })

              this.submittingForm = false;

              this.store.dispatch(formLoaded({ isFormLoaded: true }))
              this.store.dispatch(new MarkAsSubmittedAction('generic'))
              this.store.dispatch(new ResetAction('generic'));
            }
          },
          error: err => {
            console.error(err)
          }
        })
      }
    });
  }
}