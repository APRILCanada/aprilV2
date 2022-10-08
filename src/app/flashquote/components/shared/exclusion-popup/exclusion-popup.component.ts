import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-exclusion-popup',
  templateUrl: './exclusion-popup.component.html',
  styleUrls: ['./exclusion-popup.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '250ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(
          '250ms ease-in-out',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        )
      ])
    ])
  ]
})
export class ExclusionPopupComponent implements OnInit {
  @Input() error: any;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    console.log('ERROR', this.error)
  }
}