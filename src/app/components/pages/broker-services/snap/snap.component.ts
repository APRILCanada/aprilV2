import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LanguageService } from 'src/app/services/language.service';
import * as data from './snap'

@Component({
  selector: 'app-snap',
  templateUrl: './snap.component.html',
  styleUrls: ['./snap.component.scss']
})
export class SnapComponent implements OnInit {

  @ViewChildren('owlParent') owlParent:QueryList<ElementRef>;

  snaps = data.snap;
  
  snapOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayMouseleaveTimeout: 2000,
    dots: false,
    navSpeed: 700,
    navText: ["<div class='carret-left-white icon pe-5'></div>","<div class='carret-right-white icon pe-5'></div>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      },
      1200:{
        items:1
      }
    },
    nav: true
  }

  constructor(public language: LanguageService,private renderer: Renderer2,
   ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.positionPrev();
    this.positionNext();
  }
 
  positionPrev(){
    this.owlParent.forEach(item => item.nativeElement.querySelectorAll('.owl-prev').forEach((item: any) => {
      this.renderer.setStyle(item, 'background', 'transparent');
      this.renderer.setStyle(item, 'color', 'var(--mainColor)');
      this.renderer.setStyle(item, 'position', 'absolute');
      this.renderer.setStyle(item, 'left', '-80px');
      this.renderer.setStyle(item, 'top', '40%');
      this.renderer.setStyle(item, 'transform', 'translateY(15px)');

    }));
  }

  positionNext(){
    this.owlParent.forEach(item => item.nativeElement.querySelectorAll('.owl-next').forEach((item: any) => {
      this.renderer.setStyle(item, 'background', 'transparent');
      this.renderer.setStyle(item, 'color', 'var(--mainColor)');
      this.renderer.setStyle(item, 'position', 'absolute');
      this.renderer.setStyle(item, 'right', '-80px');
      this.renderer.setStyle(item, 'top', '40%');
      this.renderer.setStyle(item, 'transform', 'translateY(15px)');
    }))
  }
}