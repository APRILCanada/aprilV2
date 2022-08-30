import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpRequest, HttpEventType, HttpResponse, HttpClient, HttpHeaders, HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Label } from '../models/Label';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }

  public upload(files: Set<File>, id:string, classifications:{[filename:string]:string}, useTemp:boolean = false):
    { [key: string]: { progress: Observable<number>, completed:boolean, error:boolean, message:Label  } } {

    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number>, completed:boolean, error:boolean, message:Label } } = {};
    
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
          else if(event instanceof HttpResponse){
            status[file.name].completed = true;
            progress.complete();
          }
        },
        error =>{
          if(error instanceof HttpErrorResponse){
            if(error.status == 400){
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
        error:false,
        message:new Label("",""),
      };
    });

    // return the map of progress.observables
    return status;
  }
}
