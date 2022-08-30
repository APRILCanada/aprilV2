import { HttpEventType, HttpErrorResponse, HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentViewerComponent } from '../questions/components/document-viewer/document-viewer.component';
import { Label } from '../models/Label';
import { QuoteFile } from '../models/QuoteFile';
import { OverlayService } from './overlay.service';
import { QuoteService } from './quote.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  filesChanged: BehaviorSubject<QuoteFile[]> = new BehaviorSubject<QuoteFile[]>([]);

  _currentUploadKey: string = "";
  _currentFiles: QuoteFile[] = [];

  constructor(private http: HttpClient, private customDialog: OverlayService, private quoteService: QuoteService) { }

  updateFiles(files: QuoteFile[]) {
    this._currentFiles = [];
    this._currentFiles.push(...files);
    this.filesChanged.next(this._currentFiles);
  }

  public get(uploadKey: string): Observable<QuoteFile[]> {
    this._currentUploadKey = uploadKey;
    if (uploadKey == "-1") {
      let array: QuoteFile[] = [];
      return of(array);
    }
    return this.http.get<QuoteFile[]>(`${environment.apiURL}/api/file/` + uploadKey);
  }

  public upload(files: Set<File>, id: string, classifications: { [filename: string]: string }, useTemp: boolean = false): { [key: string]: { progress: Observable<number>, completed: boolean, error: boolean, message: Label } } {

    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number>, completed: boolean, error: boolean, message: Label } } = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append(classifications[file.name], file, file.name);

      var url = useTemp ? `${environment.apiURL}/api/file/temp/` + id : `${environment.apiURL}/api/file/` + id;
      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {

            // calculate the progress percentage
            const percentDone = Math.round(100 * event.loaded / event.total!);

            // pass the percentage into the progress-stream
            progress.next(percentDone);
          }
          else if (event instanceof HttpResponse) {
            status[file.name].completed = true;
            progress.complete();
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status == 400) {
              status[file.name].error = true;
              status[file.name].message = new Label("Les documents protégés par mot de passe ne sont pas autorisés.", "Password-protected documents are not allowed.");
            }
            status[file.name].completed = true;
            progress.complete();
          }
        });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable(),
        completed: false,
        error: false,
        message: new Label("", ""),
      };
    });

    // return the map of progress.observables
    return status;
  }

  openFile(file: Blob, name: Label, fileType: string, referenceNumber: string) {
    let data = new Blob([file], { type: 'application/pdf' });
    var filename = fileType + "_" + referenceNumber;
    if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveOrOpenBlob(data, filename + ".pdf");
    }
    else {

      let arrayOfBlob = new Array<Blob>();
      arrayOfBlob.push(data);
      let pdf = new File(arrayOfBlob, filename, {
        type: "application/pdf"
      });
      var ref = this.customDialog.open({
        component: DocumentViewerComponent,
        allowBackdropClick: true,
        hasBackdrop: true,
        width: "70%",
        data: {
          file: pdf,
          name: name,
        }

      });
    }

  }
}
