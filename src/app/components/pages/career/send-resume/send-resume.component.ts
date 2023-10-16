import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, throwError, of } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { Contact } from 'src/app/components/common/model/Contact';
import { LanguageService } from 'src/app/services/language.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { MultiselectService } from 'src/app/services/multiselect.service';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import { HrService } from 'src/app/components/firebase/services/hr.service';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-send-resume',
  templateUrl: './send-resume.component.html',
  styleUrls: ['./send-resume.component.scss'],
})
export class SendResumeComponent implements OnInit {
  public contentType: string[] = [];
  public downloadURL: string[] = [];
  public fileName: string = '';
  public maxFileSize = 20971520;
  language$: Observable<string>;
  jobsEn: IMultiSelectOption[];
  jobsFr: IMultiSelectOption[];
  textJobsEn: IMultiSelectTexts = this.dropDown.textJobsEn
  textJobsFr: IMultiSelectTexts = this.dropDown.textJobsFr
  settings: IMultiSelectSettings = this.dropDown.settings;

  result: Observable<any>;
  result2: Observable<any>;

  contact: Contact;
  contactForm: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,9}'),
    ]),
    phone: new FormControl(null, Validators.required),
    position: new FormControl(null, Validators.required),
    message: new FormControl(null, Validators.required),
    newsLetter: new FormControl(false),
    file: new FormControl('', [Validators.required]),
  });

  constructor(
    public language: LanguageService,
    private modalService: NgbModal,
    private fireFunctions: AngularFireFunctions,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private dropDown: MultiselectService,
    private hrService: HrService,
    private jobApplication: JobApplicationService,
  ) {}

  ngOnInit(): void {
    // Getting jobs to populate the dropdown
    this.hrService.getJobs().subscribe((jobs) => {

      let jobsList = jobs.filter((job) => job.isActive == 'isActive');
      // Making the array of Jobs into an array of IMultiSelectOption
      this.jobsEn = jobsList.map((job) => {
        return { id: job.en.title, name: job.en.title || ""}
      })

      this.jobsFr = jobsList.map((job) => {
        return { id: job.fr.title, name: job.fr.title || ""}
      })
    });
  
    this.jobApplication._job.subscribe(job => {
      // this.language.get() == 'fr' ? 
      // this.contactForm.controls["position"].setValue(job.fr.title) : 
      // this.contactForm.controls["position"].setValue(job.en.title);
    })
  }

  onSubmit() {
    this.contact = this.contactForm.value;

    const callable = this.fireFunctions.httpsCallable('sendResume');
    this.result = callable({
      email: this.contact.email,
      province: this.contact.province,
      firstName: this.contact.firstName,
      lastName: this.contact.lastName,
      language: this.language.get(),
      phone: this.contact.phone,
      position: this.contact.position,
      message: this.contact.message,
      file: this.fileName,
      filePath: this.downloadURL.toString(),
    });
    this.result.subscribe();

    if (this.contact.newsLetter) {
      const callable = this.fireFunctions.httpsCallable('subscribeNewsletter');
      this.result2 = callable({
        email: this.contact.email,
        province: this.contact.province,
        fullName: this.contact.firstName + ' ' + this.contact.lastName,
        language: this.language.get(),
      });
      this.result2.subscribe();
    }

    this.contactForm.reset();
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
      const fileRef = this.angularFireStorage.ref(fileName);

      // Create upload task.
      const task = this.angularFireStorage.upload(fileName, file, file.type);

      // Upload file to Cloud Firestore.
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((downloadURL: string) => {
              // console.log(downloadURL);
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
