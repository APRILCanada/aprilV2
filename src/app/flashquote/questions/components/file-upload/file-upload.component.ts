import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { QuoteFile } from 'src/app/flashquote/models/QuoteFile';
import { FileService } from 'src/app/flashquote/services/file.service';
import { OverlayService } from 'src/app/flashquote/services/overlay.service';
import { FileUploadOverlayComponent } from '../file-upload-overlay/file-upload-overlay.component';
import { UploadedFilesComponent } from '../uploaded-files/uploaded-files.component';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnChanges {

  @Output() filesUploaded = new EventEmitter<QuoteFile[]>();
  @Input() uploadKey:string = "";
  @Input() hasOptions:boolean = true;
  @Input() multipleFiles:boolean = true;
  @Input() useTemp:boolean = false;
  @Input() defaultType: string = "";
  @Input() anonymous:boolean = false;

  uploadedFiles:QuoteFile[] = [];

  constructor(public translate:TranslateService, private fileService:FileService, private customDialog:OverlayService) { }

  ngOnInit() {
    this.uploadedFiles = [];
    this.fileService.filesChanged.subscribe(files => {
      this.uploadedFiles = files;
      // if(this.uploadedFiles.length > 0){
      //   this.filesUploaded.emit(this.uploadedFiles);
      // }
    });
    this.getFiles();
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['uploadKey'].previousValue != changes['uploadKey'].currentValue && changes['uploadKey'].currentValue != ""){
      this.uploadedFiles = [];
      this.getFiles();
    }
  }

  // on file selected, show overlay + dialog
  filesChanged(files:FileList){
    var overlayRef = this.customDialog.open({
      allowBackdropClick: false,
      component:FileUploadOverlayComponent,
      data:{
        files:files,
        uploadKey:this.uploadKey,
        hasOptions:this.hasOptions,
        multipleFiles:this.multipleFiles,
        useTemp:this.useTemp,
        defaultType:this.defaultType,
        existingFiles: this.uploadedFiles,
      },
      height: "auto",
      width: "auto"
    });
    overlayRef.afterClosed$.subscribe((event: any) => {
      if(event.type == 'apply'){
        if(this.useTemp || this.anonymous){
          this.updateFiles(event.data.files);
        }
        else {
          this.getFiles();
        }
      }
    })
  }

  
  getFiles(){
    if(this.anonymous){
      return;
    }
    this.uploadedFiles = [];
    if(this.useTemp){
      this.updateFiles(this.uploadedFiles);
    }
    else {
      this.fileService.get(this.uploadKey).subscribe(files => {
        this.updateFiles(files);
      });
    }
  }

  updateFiles(files:QuoteFile[]){
    this.fileService.updateFiles(files);
  }

  showFiles(){
    var ref = this.customDialog.open({
      allowBackdropClick:true,
      component:UploadedFilesComponent,
      height:'auto',
      width:'500px',
      data: {
        files: this.uploadedFiles
      }
    });
  }
}
