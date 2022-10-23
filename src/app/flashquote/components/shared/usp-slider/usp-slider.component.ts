import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usp-slider',
  templateUrl: './usp-slider.component.html',
  styleUrls: ['./usp-slider.component.scss'],
})
export class UspSliderComponent implements OnInit {
  
  imageObject = [{
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
  }, {
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
  }, {
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
  }];

  constructor() { }

  ngOnInit(): void { }

}
