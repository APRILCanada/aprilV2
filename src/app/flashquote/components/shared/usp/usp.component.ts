import { Component, Input, OnInit } from '@angular/core';
import { BrokerDTO } from 'src/app/flashquote/models/Broker';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-usp',
  templateUrl: './usp.component.html',
  styleUrls: ['./usp.component.scss'],
})
export class UspComponent implements OnInit {
  @Input() broker: BrokerDTO;
  color: string;
  
  imageObject = [{
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
  }, {
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
  }, {
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
  }];

  constructor(public language : LanguageService) { }

  ngOnInit(): void { 
    this.color = this.broker.styles.hero['background-color'] || '#004161';
  }

}
