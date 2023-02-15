import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  IMultiSelectOption,
  IMultiSelectTexts,
  IMultiSelectSettings,
} from 'ngx-bootstrap-multiselect';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/language.service';
import { MultiselectService } from 'src/app/services/multiselect.service';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-flash-form',
  templateUrl: './flash-form.component.html',
  styleUrls: ['./flash-form.component.scss'],
})
export class FlashFormComponent {
  public contentType: string[] = [];

  public downloadURL: string[] = [];
  public fileName: string = '';
  public maxFileSize = 20971520;
  result: Observable<any>;
  result2: Observable<any>;
  activityEn: IMultiSelectOption[] = this.dropDown.activityEn;
  activityFr: IMultiSelectOption[] = this.dropDown.activityFr;
  textActivityFr: IMultiSelectTexts = this.dropDown.textActivityFr;
  textActivityEn: IMultiSelectTexts = this.dropDown.textActivityEn;

  limitEn: IMultiSelectOption[] = this.dropDown.limitEn;
  limitFr: IMultiSelectOption[] = this.dropDown.limitFr;

  settings: IMultiSelectSettings = this.dropDown.settings;
  settingsLong: IMultiSelectSettings = this.dropDown.settingsLong;
  id: string;
  form: any;
  flashForm: FormGroup = new FormGroup({
    fullName: new FormControl(null, Validators.required),
    // companyName: new FormControl(null, Validators.required),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,9}'),
    ]),
    phoneNumber: new FormControl(null, Validators.required),
    risk: new FormControl(null, Validators.required),
    // limit: new FormControl(null, Validators.required),
    revenue: new FormControl(null, Validators.required),
    // yBusiness: new FormControl(null, Validators.required),
    yExperience: new FormControl(null, Validators.required),
    // message: new FormControl(null),
  });

  constructor(
    public language: LanguageService,
    private modalService: NgbModal,
    public router: Router,
    private dropDown: MultiselectService,
    private fireFunctions: AngularFireFunctions,
    private angularFireStorage: AngularFireStorage,
    public page: PageService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  onSubmit() {
    this.form = this.flashForm.value;
    const callable = this.fireFunctions.httpsCallable('sendDirect');
    this.result = callable({
      fullName: this.form.fullName,

      // companyName: this.form.companyName,
      email: this.form.email,
      phoneNumber: this.form.phoneNumber,
      risk: this.form.risk,
      // limit: this.form.limit,
      revenue: this.form.revenue,
      // yBusiness: this.form.yBusiness,
      yExperience: this.form.yExperience,
      language: this.language.get(),
      // message: this.form.message,
    });
    this.result.subscribe();

    this.flashForm.reset();
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
