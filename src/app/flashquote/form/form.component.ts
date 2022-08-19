import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Question } from '../models/Question';
import { FormGroupState, ResetAction, SetValueAction } from 'ngrx-forms';
import { filter, map, take } from 'rxjs/operators';
import { FormValue, State } from '../store';
import { ActionService } from '../services/action.service';
import { Answer } from '../models/Answer';
import { FlashquoteService } from '../services/flashquote.service';
import { SetSubmittedValueAction } from '../actions/flashquote.actions';
import {
  selectQuestions,
  selectFormState,
  selectSubmittedValue,
  selectErrors,
  selectFormValid,
  selectFormSubmitted,
  selectBroker,
} from '../selectors';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy, AfterContentChecked {
  questions: Question[];
  errors$: Observable<any>;
  formState$: Observable<any>;
  formValid$: Observable<boolean>;
  formSubmitted$: Observable<boolean>;
  submittedValue$: Observable<FormValue | undefined>;
  submittingForm = false;
  answers: Answer[];
  formSubscription: Subscription;
  broker: any;
  logo: string;

  constructor(
    private store: Store<State>,
    private actionService: ActionService,
    private flashquoteService: FlashquoteService,
    private router: Router,
    public language: LanguageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getFormState();
    this.getQuestions();
    this.getSubmittedValue();
    this.getFormValid();
    this.getFormSubmitted();
    this.getErrors();
    this.getBroker();

    this.onFormChange();
  }

  //https://stackoverflow.com/questions/34364880/expression-has-changed-after-it-was-checked
  ngAfterContentChecked() {
    this.cdr.detectChanges();
}

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }

  onFormChange() {
    this.formSubscription = this.formState$.subscribe((state) => {
      for (let control in state.controls) {
        const question = this.questions.find((q) => q.id === parseInt(control));
        //validate rules if question has any
        if (question && this.hasRules(question)) {
          this.actionService.validate(question, state.controls[control]);
        }
      }
    });
  }

  getBroker() {
    this.store.pipe(select(selectBroker)).subscribe(broker => {
      this.broker = broker
      this.logo = encodeURIComponent(broker.logo)
    })
  }

  getQuestions() {
    this.store.pipe(select(selectQuestions)).subscribe((data) => {
      this.questions = data;
    });
  }

  getErrors() {
    this.errors$ = this.store.pipe(select(selectErrors));
  }

  getFormState() {
    this.formState$ = this.store.pipe(select(selectFormState));
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
  hasRules(question: Question | undefined) {
    return question?.rules.length ? true : false;
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
          let answers = [];
          for (let key in form.value) {
            if (key === '2885') {
              for (let responseKey in form.value[2885]) {
                answers.push(
                  new Answer(
                    key,
                    '',
                    responseKey,
                    (form.value[2885][responseKey] / 100).toString()
                  )
                );
              }
            } else {
              const identifier = this.questions.find(
                (q: Question) => q.id === parseInt(key)
              )!.identifier;
              answers.push(new Answer(key, '', identifier, form.value[key]));
            }
          }
          const formData = {
            Code: this.broker.aprilonId,
            MarketId: this.broker.marketId,
            Language: 'en',
            Answers: answers,
          };
          return new SetSubmittedValueAction(formData);
        })
      )
      .subscribe(this.store);

    this.submittedValue$.subscribe((data) => {
      if (data) {
        this.flashquoteService.submitQuote(data);
        setTimeout(() => {
          this.submittingForm = false;
          this.router.navigate(['prime'])
        }, 5000)
      }
      //this.router.navigate(['prime'])
      // this.flashquoteService.submitQuote(data).subscribe({
      //   next: quoteResult => {
      //     console.log('quote result', quoteResult)
      //   },
      //   error: err => {
      //     console.error(err)
      //   }
      // })
    });

    // dispatch action to set the form as pristine, untouched and unsubmitted
    //this.store.dispatch(new ResetAction(INITIAL_STATE.id));
    // this.store.dispatch(new SetValueAction(INITIAL_STATE.id, {}));
    //this.router.navigate(['/prime'])
  }
}
