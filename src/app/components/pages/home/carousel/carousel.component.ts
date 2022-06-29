import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NicheService } from 'src/app/components/firebase/services/niche.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @ViewChildren('owlParent') owlParent: QueryList<ElementRef>;

  niches: any[];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayMouseleaveTimeout: 2000,
    dots: false,
    navSpeed: 700,
    navText: [
      "<div class='carret-left icon pe-5'></div>",
      "<div class='carret-right icon pe-5'></div>",
    ],
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      576: {
        items: 3,
        nav: false,
      },
      768: {
        items: 4,
        nav: false,
      },
      1200: {
        items: 5,
      },
    },

    nav: true,
  };

  constructor(
    private renderer: Renderer2,
    private nicheService: NicheService,
    public language: LanguageService
  ) {}

  ngOnInit(): void {
    this.niches = this.nicheService.getNichesList();
  }

  ngAfterViewInit() {
    this.positionPrev();
    this.positionNext();
  }

  positionPrev() {
    this.owlParent.forEach((item) =>
      item.nativeElement.querySelectorAll('.owl-prev').forEach((item: any) => {
        this.renderer.setStyle(item, 'background', 'transparent');
        this.renderer.setStyle(item, 'color', 'var(--mainColor)');
        this.renderer.setStyle(item, 'position', 'absolute');
        this.renderer.setStyle(item, 'left', '-100px');
        this.renderer.setStyle(item, 'top', '40%');
        this.renderer.setStyle(item, 'transform', 'translateY(-20%)');
      })
    );
  }

  positionNext() {
    this.owlParent.forEach((item) =>
      item.nativeElement.querySelectorAll('.owl-next').forEach((item: any) => {
        this.renderer.setStyle(item, 'background', 'transparent');
        this.renderer.setStyle(item, 'color', 'var(--mainColor)');
        this.renderer.setStyle(item, 'position', 'absolute');
        this.renderer.setStyle(item, 'right', '-100px');
        this.renderer.setStyle(item, 'top', '40%');
        this.renderer.setStyle(item, 'transform', 'translateY(-20%)');
      })
    );
  }
}
