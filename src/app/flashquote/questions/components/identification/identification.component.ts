// import { Component, Input, OnInit } from '@angular/core';
// import { FormControlState } from 'ngrx-forms';
// import { Observable, of } from 'rxjs';
// import { Question } from 'src/app/flashquote/models/Question';
// import { LanguageService } from 'src/app/services/language.service';

// @Component({
//   selector: 'app-identification',
//   templateUrl: './identification.component.html',
//   styleUrls: ['./identification.component.scss']
// })
// export class IdentificationComponent implements OnInit {
//   @Input() question: Question;
//   @Input() control: FormControlState<any>;
//   @Input() error: any
//   group: any;

//   constructor(public language: LanguageService) { }

//   // Identification is a control with 2 inner controls (firstName and lastName)
//   ngOnInit() {
//     this.group = (this.control as any).controls
//   }
// }


import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormControlState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { Question } from 'src/app/flashquote/models/Question';
import { selectActiveSection, selectErrors } from 'src/app/flashquote/selectors';
import { State } from 'src/app/flashquote/store';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {
  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any
  controlId: any
  activeSection: any;
  group$: Observable<any>
  errors$: Observable<any>

  constructor(public language: LanguageService, private store: Store<State>) { }


  ngOnInit() {
    this.controlId = parseInt(this.control.id.slice(11, 12)) // TEMP BUG FIX

    this.group$ = this.store.pipe(
      select((s) => (s.form.formState.controls[s.form.activeSection.id].controls[this.controlId] as any)?.controls[this.question.id]?.controls)
    )

    this.store.pipe(select(selectActiveSection)).subscribe((data) => {
      this.activeSection = data;
    });

    this.errors$ = this.store.pipe(select(selectErrors));
  }
}


