import { AfterContentInit, Component, OnInit } from '@angular/core';
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
import { LanguageService } from 'src/app/services/language.service';
import { MultiselectService } from 'src/app/services/multiselect.service';
import { Claim } from '../../common/model/Claim';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss'],
})
export class ClaimsComponent implements OnInit, AfterContentInit {
  public contentType: string[] = [];
  public downloadURL: string[] = [];
  public fileName: string = '';
  public maxFileSize = 20971520;
  result: Observable<any>;
  provEn: IMultiSelectOption[] = this.dropDown.provEn;
  provFr: IMultiSelectOption[] = this.dropDown.provFr;
  textProv: IMultiSelectTexts = this.dropDown.textProv;
  settings: IMultiSelectSettings = this.dropDown.settings;
  riskEn: IMultiSelectOption[] = this.dropDown.riskEn;
  riskFr: IMultiSelectOption[] = this.dropDown.riskFr;
  textRiskFr: IMultiSelectTexts = this.dropDown.textRiskFr;
  textRiskEn: IMultiSelectTexts = this.dropDown.textRiskEn;
  claimType: any;
  claim: Claim;
  auto: any;
  claimForm: FormGroup = new FormGroup({
    policyNumber: new FormControl(null, Validators.required),
    insured: new FormControl(null, Validators.required),
    company: new FormControl(null),
    phoneNumber: new FormControl(null, Validators.required),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,9}'),
    ]),
    date: new FormGroup({
      year: new FormControl(null, Validators.required),
      month: new FormControl(null, Validators.required),
      day: new FormControl(null, Validators.required),
    }),
    province: new FormControl(null, Validators.required),
    reason: new FormControl(null, Validators.required),
    file: new FormControl(null),
  });
  autoForm: FormGroup = new FormGroup({
    year: new FormControl(null),
    builder: new FormControl(null),
    model: new FormControl(null),
    VIN: new FormControl(null),
    driver: new FormControl(null),
    licenceNumber: new FormControl(null),
    accidentLocation: new FormControl(null),
    circumstance: new FormControl(null),
    thirdParty: new FormGroup({
      driver: new FormControl(null),
      licenceNumber: new FormControl(null),
      phone: new FormControl(null),
      insurer: new FormControl(null),
      VIN: new FormControl(null),
    }),
  });

  constructor(
    public modalService: NgbModal,
    public language: LanguageService,
    private dropDown: MultiselectService,
    private fireFunctions: AngularFireFunctions,
    private angularFireStorage: AngularFireStorage,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngAfterContentInit() {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'pageLoad',
      'page.language': this.language.get(),
      'page.type': 'Réclamations',
      'niche.type': '',
      'product.type': '',
      'filter.type': '',
    });
    // console.log(window.dataLayer);
  }

  onChange(claimType: any) {}
  onSubmit() {
    this.claim = this.claimForm.value;
    this.auto = this.autoForm.value;

    console.log(
      this.claim.date?.day +
        ' - ' +
        this.claim.date?.month +
        ' - ' +
        this.claim.date?.year
    );

    const callable = this.fireFunctions.httpsCallable('emailClaimForm');
    this.result = callable({
      language: this.language.get(),
      policyNumber: this.claim.policyNumber,
      insured: this.claim.insured || '',
      company: this.claim.company || '',
      phoneNumber: this.claim.phoneNumber || '',
      email: this.claim.email || '',
      date:
        this.claim.date?.day +
        ' - ' +
        this.claim.date?.month +
        ' - ' +
        this.claim.date?.year,
      province: this.claim.province || '',
      contractType: this.claimType || '',
      autoYear: this.auto?.year || '',
      autoBuilder: this.auto?.builder || '',
      autoModel: this.auto?.model || '',
      autoVIN: this.auto?.VIN || '',
      autoDriver: this.auto?.driver || '',
      autoLicenceNumber: this.auto?.licenceNumber || '',
      autoAccidentLocation: this.auto?.accidentLocation || '',
      autoCircumstance: this.auto?.circumstance || '',
      thirdPartyDriver: this.auto?.thirdParty?.driver || '',
      thirdPartyLicenceNumber: this.auto?.thirdParty?.licenceNumber || '',
      thirdPartyPhone: this.auto?.thirdParty?.phoneNumber || '',
      thirdPartyInsurer: this.auto?.thirdParty?.insurer || '',
      thirdPartyVIN: this.auto?.thirdParty?.VIN || '',
      file: this.fileName,
      filePath: this.downloadURL.toString(),
      claimReason: this.claim.reason,
    });
    this.result.subscribe();
    
    this.claimForm.reset();
  }

  close() {
    this.modalService.dismissAll();
  }

  openModal(content: any) {
    this.modalService.dismissAll();
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
