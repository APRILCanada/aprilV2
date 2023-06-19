import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { Question } from '../models/Question';
import { MarkAsSubmittedAction, ResetAction } from 'ngrx-forms';
import { distinctUntilChanged, map, take, tap } from 'rxjs/operators';
import { FormValue, State } from '../store';
import { ActionService } from '../services/action.service';
import { Answer } from '../models/Answer';
import { FlashquoteService } from '../services/flashquote.service';
import { formLoaded, RemoveGroupSectionAction, setActiveSection, setExclusions, setPrime, SetSubmittedValueAction } from '../actions/flashquote.actions';
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
  selectPrime,
  selectExclusions,
} from '../selectors';
import { LanguageService } from 'src/app/services/language.service';
import { Section } from '../models/Section';
import { ActiveSection } from '../models/ActiveSection'
import { BrokerDTO } from '../models/Broker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactMeDialogComponent } from '../components/shared/contact-me-dialog/contact-me-dialog.component'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterContentChecked {
  sections: Section[];
  questionsBySection?: Question[];
  activeSection: ActiveSection;
  errors$: Observable<any>;
  errors: any;
  formState$: Observable<any>;
  prime$: Observable<any>;
  exclusions$: Observable<any>;
  exclusionImg: string = '../../../assets/img/direct/quote_end.png';
  userExclusions: any = [];
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
    public language: LanguageService,
    private cdr: ChangeDetectorRef,
    private actionsSubject: ActionsSubject,
    private modalService: NgbModal,
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
    this.getExclusions();
    this.onFormChange();
  }

  //https://stackoverflow.com/questions/34364880/expression-has-changed-after-it-was-checked
  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

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
              this.actionService.validate(question, group.controls, key, group.id, this.questionsBySection, );
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

  getExclusions() {
    this.exclusions$ = this.store.pipe(select(selectExclusions))
  }

  getFormValid() {
    this.formValid$ = this.store.pipe(select(selectFormValid));
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
    const sectionValid = this.flashquoteService.validateSection(this.errors['_' + this.activeSection.id])
    this.flashquoteService.resetValidateSectionKeys()

    if (!sectionValid && step === 1) {
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
        isExcluded: false,
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
    // validate section errors (other than exlusions)
    const sectionValid = this.flashquoteService.validateSection(this.errors['_' + this.activeSection.id])
    if (!sectionValid) {
      return this.store.dispatch(new MarkAsSubmittedAction('generic'))
    }
    // get all the exclusions from all sections
    if (this.flashquoteService.validateSection(this.errors)) {
      const exclusions = this.flashquoteService.getUserExclusions(this.errors)
      // set exclusions
      this.store.dispatch(setExclusions({ exclusions }))
    }

    this.formState$
      .pipe(
        take(1),
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

                // CASE A FIELD IS NOT LINKED TO A QUESTION AND HAS NO IDENTIFIER (LIKE ID: 3054 SpecializedContractor)
                if (!identifier && !questionType) {
                  if (typeof groupSection[key] === 'object') {
                    for (let subKey in groupSection[key]) {
                      let value = groupSection[key][subKey]

                      answers.push(new Answer(
                        sectionIsRepeat ? key + '_' + i : key,
                        sectionKey,
                        value,
                        sectionIsRepeat ? subKey + '-' + i : subKey
                      ))
                    }
                  }
                }

                if (identifier && questionType) {
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
                  // case repartition associated to a multiple where identifier does not exist
                  // "Key": "2885",
                  // "SectionId": "164",
                  // "Identifier": "21",
                  // "Value": "0"
                } else if (!identifier && questionType) {
                  if (typeof groupSection[key] === 'object') {
                    for (let subKey in groupSection[key]) {
                      let value = groupSection[key][subKey]

                      if (questionType === 'REPARTITION') {
                        value = (value / 100).toString()
                      }

                      answers.push(new Answer(
                        sectionIsRepeat ? key + '_' + i : key,
                        sectionKey,
                        value,
                        sectionIsRepeat ? subKey + '-' + i : subKey
                      ))
                    }
                  }
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
        }),
      ).subscribe(this.store)

    this.submittedValue$.subscribe((data) => {

      this.store.dispatch(formLoaded({ isFormLoaded: false }))
      if (data) {
        window.scrollTo(0, 700);
        
        // if(data.marketId == '76' && environment.production) marketId = '74';
        this.flashquoteService.submitQuote(data, this.broker).subscribe({
          next: (quoteResult:any) => {
            // console.log('QUOTE RESULT', quoteResult)
            this.quoteResult = quoteResult

            // temp code: get the exclusions because contractor sends premium even if exclusions exist
            //this.exclusions$.subscribe(exclusions => this.userExclusions = exclusions)

            //if (quoteResult && quoteResult.total.premium > 0 && !this.userExclusions.length) {
            if (quoteResult && quoteResult.total.premium > 0 && quoteResult.total.title.LabelEn != 'EXCLUDED') {
              this.store.dispatch(setActiveSection({
                activeSection: {
                  id: this.sections.length,
                  title: { LabelEn: 'Your estimated prime', LabelFr: 'Votre prime estimée' },
                  isRepeat: false,
                  index: this.sections.length,
                  isFirst: false,
                  isLast: false,
                  isPrime: true,
                  isExcluded: false,
                  sectionsLength: this.sections.length,
                  maxRepeat: 0
                }
              }))

              // set prime
              this.formState$.subscribe(formValue => {
                this.store.dispatch(setPrime({ marketId: this.broker.marketId, formValue, prime: quoteResult.total.premium }))
              })

            }
            //else if ((quoteResult && !quoteResult.total.premium) || (quoteResult && quoteResult.total.premium > 0 && this.userExclusions.length)) {
            else {
              this.store.dispatch(setActiveSection({
                activeSection: {
                  id: this.sections.length,
                  title: { LabelEn: 'Your estimated prime', LabelFr: 'Votre prime estimée' },
                  isRepeat: false,
                  index: this.sections.length,
                  isFirst: false,
                  isLast: false,
                  isPrime: false,
                  isExcluded: true,
                  sectionsLength: this.sections.length,
                  maxRepeat: 0
                }
              }))
            }

            this.submittingForm = false;

            this.store.dispatch(formLoaded({ isFormLoaded: true }))
            this.store.dispatch(new MarkAsSubmittedAction('generic'))
            this.store.dispatch(new ResetAction('generic'));

          },
          error: (err:any) => {
            console.error(err)
          }
        })
      }
    });
  }

  openContactModal() {
    this.modalService.open(ContactMeDialogComponent , { size: 'md', centered: true })
  }
}