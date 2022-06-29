import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  result: Observable<any>;
  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private fireFunctions: AngularFireFunctions,
    public language: LanguageService
  ) {}

  public contentType: string[] = [];
  public downloadURL: string[] = [];
  public fileName: string = '';
  public maxFileSize = 20971520;

  public contactForm: FormGroup = this.formBuilder.group({
    fileUploader: [
      '',
      Validators.compose([
        // Your validators rules...
      ]),
    ],
  });

  public onSubmit(form: any, formDirective: FormGroupDirective): void {
    form.contentType = this.contentType;
    form.fileUploader = this.downloadURL;
    form.fileName = this.fileName;

    // this.angularFirestore
    //   .collection(String(process.env.FIRESTORE_COLLECTION_MESSAGES)) // Make sure the environmental variable is a string.
    //   .add(form);
    // .then(() => {
    //   // Your logic, such as alert...
    // .catch((error) => {
    //   console.log
    //   // Your error handling logic...
    // });

    const callable = this.fireFunctions.httpsCallable('sendResume');
    console.log('before');
    this.result = callable({
      email: 'michael.babin@april.ca',
      province: 'QC',
      firstName: 'Michael',
      lastName: 'Babin',
      language: this.language.get(),
      phone: 'this.contactForm.phone',
      message: 'this.contactForm.message',
      file: this.fileName,
      filePath: this.downloadURL.toString(),
    });
    this.result.subscribe();
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
              console.log(downloadURL);
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
