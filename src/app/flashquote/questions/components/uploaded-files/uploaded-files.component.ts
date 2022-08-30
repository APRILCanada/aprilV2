import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CustomOverlayRef } from 'src/app/flashquote/models/custom-overlay-ref';
import { DIALOG_DATA } from 'src/app/flashquote/models/custom-overlay.token';

@Component({
  selector: 'app-uploaded-files',
  templateUrl: './uploaded-files.component.html',
  styleUrls: ['./uploaded-files.component.scss']
})
export class UploadedFilesComponent implements OnInit {

  uploadedFiles:any[] = [];

  constructor(  public ref: CustomOverlayRef,
    @Inject(DIALOG_DATA) public data: any) {

      this.uploadedFiles = data.files || [];
     }

  ngOnInit(): void {
  }

  close(){
    this.ref.close();
  }
}
