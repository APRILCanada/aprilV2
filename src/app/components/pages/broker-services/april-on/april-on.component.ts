import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-april-on',
  templateUrl: './april-on.component.html',
  styleUrls: ['./april-on.component.scss'],
})
export class AprilOnComponent implements OnInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef;
  @ViewChild('videoBtn', { static: false }) videoBtn: ElementRef;
  @ViewChild('videoOverlay', { static: false }) videoOverlay: ElementRef;

  constructor(public language: LanguageService) {}

  ngOnInit(): void {}

  toggleVideo(event: any) {
    if (this.videoPlayer.nativeElement.paused) {
      this.videoPlayer.nativeElement.play();
      this.videoBtn.nativeElement.style.opacity = '0';
      this.videoBtn.nativeElement.style.transition = 'all 0.2s ease-in';
      this.videoOverlay.nativeElement.style.opacity = '0';
      this.videoOverlay.nativeElement.style.transition = 'all 0.2s ease-in';
      this.videoOverlay.nativeElement.style.background =
        'rgba(255, 255, 255, 0);';
    } else {
      this.videoPlayer.nativeElement.pause();
      this.videoBtn.nativeElement.style.opacity = '1';
      this.videoBtn.nativeElement.style.transition = 'all 0.2s ease-in';
    }
  }
}
