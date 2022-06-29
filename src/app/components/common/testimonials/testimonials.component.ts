 import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit, AfterViewInit {
  @ViewChildren('owlParent') owlParent: QueryList<ElementRef>;
  testimonialsSliderOptions: OwlOptions = {
    loop: true,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayMouseleaveTimeout: 15000,
    // navSpeed: 1500,

    autoplayHoverPause: true,
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
        items: 1,
        nav: false,
      },
      768: {
        items: 1,
        nav: false,
      },
      1200: {
        items: 1,
      },
    },
  };

  testimonials: any[] = [
    {
      "name":"Samy Marier Latreille",
      "title":"SAMY_TITLE",
      "text":"SAMY_TEXT",
      "img":"samy.png"
    },
    {
      "name":"Adam Ray",
      "title":"ADAM_TITLE",
      "text":"ADAM_TEXT",
      "img":"adam.png"
    }

]

  constructor(private renderer: Renderer2, public router: Router) {}

  ngOnInit() {
    function random_testimonal_rotation (testimonials: any) {
      let n = Math.floor(Math.random() * testimonials.length);
      return  testimonials.slice(n).concat(testimonials.slice(0,n)); 
    }

    this.testimonials = random_testimonal_rotation(this.testimonials);

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
      item.nativeElement.querySelectorAll('#carret-right').forEach((item: any) => {
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
