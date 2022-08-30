import { Component, Inject, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver'
import { CustomOverlayRef } from 'src/app/flashquote/models/custom-overlay-ref';
import { DIALOG_DATA } from 'src/app/flashquote/models/custom-overlay.token';
import { Label } from 'src/app/flashquote/models/Label';
import { TranslateService } from '@ngx-translate/core';

const ZOOM_STEP: number = 0.25;
const DEFAULT_ZOOM: number = 1.25;
const MAX_ZOOM: number = 3;

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {


  file: File;
  pdfSrc = "";
  pdfZoom = DEFAULT_ZOOM;
  name: Label = new Label("Document", "Document");
  error: boolean = false;
  maxZoom = MAX_ZOOM;
  defaultZoom = DEFAULT_ZOOM;

  constructor(
    public translate: TranslateService,
    public ref: CustomOverlayRef,
    @Inject(DIALOG_DATA) public data: any) {
    this.name = data.name;
    this.error = false;
    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };
      this.file = data.file;
      reader.readAsArrayBuffer(this.file);
    }

  }

  ngOnInit(): void {
    const ele = document.getElementById('viewerContainer');
    if (ele)
      ele.style.cursor = 'grab';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function (e: any) {
      if (ele) {
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        pos = {
          left: ele.scrollLeft,
          top: ele.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      }
    };

    const mouseMoveHandler = function (e: any) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      if (ele) {
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
      }
    };

    const mouseUpHandler = function () {
      if (ele) {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');
      }

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    if (ele)
      ele.addEventListener('mousedown', mouseDownHandler);
  }

  close() {
    this.ref.close();
  }

  public zoomIn() {
    if (this.pdfZoom < MAX_ZOOM) {
      this.pdfZoom += ZOOM_STEP;
    }
  }

  public zoomOut() {
    if (this.pdfZoom > DEFAULT_ZOOM) {
      this.pdfZoom -= ZOOM_STEP;
    }
    if (this.pdfZoom < DEFAULT_ZOOM) {
      this.pdfZoom = DEFAULT_ZOOM
    }
  }

  public resetZoom() {
    this.pdfZoom = DEFAULT_ZOOM;
  }

  downloadFile() {
    FileSaver.saveAs(this.file, this.file.name + ".pdf")
  }

  onError(error: any) {
    console.error(error);
  }

}
