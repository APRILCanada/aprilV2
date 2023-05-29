import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  IMultiSelectOption,
  IMultiSelectTexts,
  IMultiSelectSettings,
} from 'ngx-bootstrap-multiselect';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { Contact } from 'src/app/components/common/model/Contact';
import { LanguageService } from 'src/app/services/language.service';
import { MultiselectService } from 'src/app/services/multiselect.service';

@Component({
  selector: 'app-send-form-form',
  templateUrl: './send-form-form.component.html',
  styleUrls: ['./send-form-form.component.scss'],
})
export class SendFormFormComponent implements OnInit {
  public contentType: string[] = [];
  public downloadURL: string[] = [];
  public fileName: string = '';
  public maxFileSize = 20971520;
  result: Observable<any>;
  result2: Observable<any>;
  provEn: IMultiSelectOption[] = this.dropDown.provEn;
  provFr: IMultiSelectOption[] = this.dropDown.provFr;
  textProvFr: IMultiSelectTexts = this.dropDown.textProvFr;
  textProvEn: IMultiSelectTexts = this.dropDown.textProvEn;

  riskEn: IMultiSelectOption[] = this.dropDown.riskEn;
  riskFr: IMultiSelectOption[] = this.dropDown.riskFr;
  textRiskFr: IMultiSelectTexts = this.dropDown.textRiskFr;
  textRiskEn: IMultiSelectTexts = this.dropDown.textRiskEn;
  settings: IMultiSelectSettings = this.dropDown.settings;

  form: any;
  formForm: FormGroup = new FormGroup({
    fullName: new FormControl(null),
    province: new FormControl(null, Validators.required),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,9}'),
    ]),
    risk: new FormControl(null, Validators.required),
    message: new FormControl(null, Validators.required),
    newsLetter: new FormControl(false),
    file: new FormControl('', [Validators.required]),
  });

  constructor(
    public language: LanguageService,
    private modalService: NgbModal,
    public router: Router,
    private dropDown: MultiselectService,
    private fireFunctions: AngularFireFunctions,
    private angularFireStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.form = this.formForm.value;

    const callable = this.fireFunctions.httpsCallable('sendForm');
    this.result = callable({
      fullName: this.form.fullName,
      province: this.form.province,
      email: this.form.email,
      language: this.language.get(),
      risk: this.form.risk,
      message: this.form.message,
      file: this.fileName,
      filePath: this.downloadURL.toString(),
    });
    this.result.subscribe();

    if (this.form.newsLetter) {
      const callable = this.fireFunctions.httpsCallable('subscribeNewsletter');
      this.result2 = callable({
        email: this.form.email,
        province: this.form.province,
        fullName: this.form.fullName,
        language: this.language.get(),
      });
      this.result2.subscribe();
    }
    this.formForm.reset();
  }

  close() {
    this.modalService.dismissAll();
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'md', centered: true });
  }

  public uploadFile(event: any): void {
    // Iterate through all uploaded files.
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]; // Get each uploaded file.
      const fileName = file.name; // It makes sure files with the same name will be uploaded more than once and each of them will have unique ID, showing date (in milliseconds) of the upload.

      this.contentType = file.type;
      this.fileName = fileName;

      // Get file reference.
      const fileRef =
        this.angularFireStorage.ref(fileName);

      // Create upload task.
      const task = this.angularFireStorage.upload(
        fileName,
        file,
        file.type
      );

      // Upload file to Cloud Firestore.
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((downloadURL: string) => {
              // this.angularFirestore
              //   .collection(String(process.env.FIRESTORE_COLLECTION_FILES)) // Make sure the environmental variable is a string.
              //   .add({ downloadURL: downloadURL });
              this.downloadURL.push(downloadURL);
            });
          }),
          catchError((error: any) => {
            return throwError(error);
          })
        )
        .subscribe();
    }
  }
}
