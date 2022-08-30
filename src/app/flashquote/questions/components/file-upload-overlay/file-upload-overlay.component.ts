import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef, Inject } from '@angular/core';
import { Label } from 'src/app/flashquote/models/Label';
import { MatSelect } from '@angular/material/select';
import { Observable, forkJoin, Subject, fromEventPattern } from 'rxjs';
import { UploadService } from 'src/app/flashquote/services/upload.service';
import { CustomOverlayRef } from 'src/app/flashquote/models/custom-overlay-ref';
import { DIALOG_DATA } from 'src/app/flashquote/models/custom-overlay.token';
import { LoaderInlineService } from 'src/app/flashquote/services/loader-inline.service';
import { FileService } from 'src/app/flashquote/services/file.service';
import { QuoteFile } from 'src/app/flashquote/models/QuoteFile';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-file-upload-overlay',
  templateUrl: './file-upload-overlay.component.html',
  styleUrls: ['./file-upload-overlay.component.scss']
})
export class  FileUploadOverlayComponent implements OnInit {

  uploadKey:string;
  hasOptions:boolean = true;
  multipleFiles:boolean = true;
  defaultType:string = "";
  fileListSet:File[] = [];
  files:string[];
  filesToUpload:FileList;
  validFiles:boolean = false;
  types:Label[] = [
    new Label("Dossier plumitif", "Criminal record"),
    new Label("Image", "Image"),
    new Label("Rapport d'inspection", "Inspection report"),
    new Label("CVA", "CVA"),
    new Label("Dossier de conduite","Driving record"),
    new Label("Licence RBQ", "RBQ Licence"),
    new Label("Proposition", "Application"),
    new Label("Autre", "Other"),
  ];
  classifications: { [filename: string]: string; } = {};
  uploadedAll:boolean = false;
  loading:boolean = false;
  
  useTemp:boolean = false;
  filesUploaded:File[] = [];
  existingFiles:QuoteFile[] = [];

  @ViewChildren("select") selects:QueryList<MatSelect>;
  @ViewChildren("input") inputs:QueryList<ElementRef>;
  
  progress:{[key:string]:{progress:Observable<number>, completed:boolean, error:boolean, message:Label}} = {};

  constructor(
    private loaderInline: LoaderInlineService,
    private fileService: FileService,
    public language: LanguageService,
    public ref: CustomOverlayRef,
    @Inject(DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.loaderInline.loading(false);
    this.uploadKey = this.data.uploadKey;
    this.hasOptions = this.data.hasOptions;
    this.multipleFiles = this.data.multipleFiles;
    this.useTemp = this.data.useTemp;
    this.files = [];
    this.defaultType = this.data.defaultType;
    this.progress = {...this.createCompleteProgress(this.files)};
    this.existingFiles = this.data.existingFiles;
    var files = this.data.files;
    this.prepareUpload(files);
  }

  prepareUpload(files: any){
    let set = new Set<File>();
    let setSize = 0;
    if(!this.multipleFiles){
      this.files = [];
      this.fileListSet = [];
    }
    for(let i = 0; i < files.length; i++){
      let file = files.item(i);
      if(!this.validFileType(file)){
        this.progress[file.name] = this.buildErrorProgress("Type de fichier invalide.", "Invalid file type.");
        if(this.files.indexOf(file.name) == -1)
          this.files.push(file.name);
        continue;
      }
      if(!this.validateSize(file)){
        this.progress[file.name] = this.buildErrorProgress("Fichier doit être plus petit que 10 MB.", "File must be less than 10 MB.");
        if(this.files.indexOf(file.name) == -1)
          this.files.push(file.name);
        continue;
      }
      if(this.existingFiles.find(x => x.filename == file.name) != undefined){
        this.progress[file.name] = this.buildErrorProgress("Un fichier portant le même nom a déjà été téléversé.", "A file with the same name has already been uploaded.");
        if(this.files.indexOf(file.name) == -1)
          this.files.push(file.name);
        continue;
      }
      if(this.files.indexOf(file.name) == -1)
        this.files.push(file.name);
      this.fileListSet.push(file);
    }
  }

  filesChanged(files:FileList){
    this.uploadedAll = false;
    this.prepareUpload(files);
  }

  remove(filename:string){
    var indexFile = this.files.indexOf(filename)
    if(indexFile > -1){
      this.files.splice(indexFile, 1);
    }
    var file = this.fileListSet.find(x => x.name == filename);
    if(file != null){
      this.fileListSet.splice(this.fileListSet.indexOf(file), 1);
    }
  }

  public isValid(select: MatSelect){
    if(select == null){
      if(!this.hasOptions){
        var errors = [];
        for(var file in this.progress){
          errors.push(this.progress[file].error);
        }
        if(errors.length == 0){
          return true;
        }
        return errors.some(x => !x);
      }
      if(this.selects == null){
        return false;
      }
      for(var sel of this.selects.toArray()){
        if(sel.empty){
          return false;
        }
      }
      return true;
    }
    return !select.empty;
  }

  getClassification(file:string){
    if(!this.hasOptions){
      return this.defaultType == "" ? "Proposition" : this.defaultType;
    }
    var index = this.files.indexOf(file);
    if(index >= 0){
      var select = this.selects.find( x => x.id == 'select_' + index.toString());
      if(select)
      var value = select.value;
      if(value == this.types.length - 1){
        var input = this.inputs.find(x => x.nativeElement.id == 'input_' + index.toString());
        var nativeElement = input == null ? null : input.nativeElement;
        return nativeElement == null ? "Autre" : nativeElement.value;
      }
      return this.types[value].LabelFr;
    }
    return "Autre";
  }

  isEmpty(id:string){
    if(!this.hasOptions){
      return false;
    }
    var empty = true;
    this.selects.forEach(select => {
      if(select.id == id){
        empty = select.empty;
        return false;
      }
      return
    });
    return empty;
  }

  uploadFiles(){
    this.loading = true;
    this.loaderInline.loading(true);
    for(var file of this.fileListSet){
      this.classifications[file.name] = this.getClassification(file.name);
    }
    this.progress = {...this.progress, ...this.fileService.upload(new Set<File>(this.fileListSet), this.uploadKey, this.classifications, this.useTemp)};
   
    this.updateForm();
  }

  updateForm(){
    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      if(!this.progress[key].completed)
        allProgressObservables.push(this.progress[key].progress);
    }
    forkJoin(allProgressObservables).subscribe(end=> {
      for(var file of this.fileListSet){
         if(!this.progress[file.name].error){
          this.filesUploaded.push(file);
        }
      }
      this.fileListSet = [];
      this.uploadedAll = true;
      this.loading = false;
      this.loaderInline.loading(false);
    });
  }

  createCompleteProgress(files:string[]){
    const status: any = {};
    for(var file of files){
      const progress = new Subject<number>();
      progress.next(100);
      progress.complete();
      status[file] = {progress: progress.asObservable(), completed:true, error: false, message: ""};
    }
    return status;
  }

  buildErrorProgress(messageFr:string, messageEn:string){
    const progress = new Subject<number>();
    progress.next(100);
    progress.complete();
    return {progress: progress.asObservable(), completed:true, error: true, message: new Label(messageFr, messageEn)};
  }

  validateSize(file:File):boolean{
    return file.size < 10485760
  }

  validFileType(file:File):boolean{
    var name = file.name;
    var type = file.type.toLowerCase();
    if(type.indexOf("video") > -1 || type.indexOf("audio") > -1){
      return false;
    }
    
    if(! (name.indexOf("rtf") > -1 || name.indexOf("png") > -1 || name.indexOf("jpeg") > -1  || name.indexOf("jpg") > -1
        || name.indexOf("doc") > -1 || name.indexOf("docx") > -1 || name.indexOf("word") > -1 || name.indexOf("pdf") > -1
        || type == "application/msword" || type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
        || type == "application/pdf" || type == "text/plain" || type == "text/rtf" )){
      return false;
    }
    return true;
  }

  apply(){
    var now = new Date();
    var files = [];
    for(var file of this.filesUploaded){
      var quoteFile = new QuoteFile();
      quoteFile.filename = file.name;
      quoteFile.fileType = file.type.toLowerCase();
      quoteFile.uploadedOn = now;
      quoteFile.classification = this.getClassification(file.name);
      files.push(quoteFile);
    }
    this.ref.close('apply', {files:files});
  }

  close(){
    this.ref.close();
  }

}
