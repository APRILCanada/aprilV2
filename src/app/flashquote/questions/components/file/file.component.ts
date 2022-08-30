import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControlState } from 'ngrx-forms';
import { Question } from 'src/app/flashquote/models/Question';
import { QuoteFile } from 'src/app/flashquote/models/QuoteFile';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {

  @Input() question: Question;
  @Input() control: FormControlState<any>;
  @Input() error: any
  // @Input() question: QuestionBase<string>;
  // @Input() form: FormGroup;
  @Input() uploadKey:string;
  // @Input() isValidating:boolean = false;
 
  openUploadedFiles:boolean = false;

  filesLoading:boolean = false;
  uploadedFiles: any[] = [];
  
  constructor(public translate:TranslateService) { }

  filesUploaded(files:QuoteFile[]){
    console.log('fuiles', files)
    // this.question.value = files.map(x => x.filename).join(';');
    // this.form.controls[this.question.key].patchValue(this.question.value);
    //this.form.controls[this.question.key].updateValueAndValidity();
  }

}
