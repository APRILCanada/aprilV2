import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  creationSrc: string;
  planeSrc: string;
  employeeSrc: string;
  officeSrc: string;
  animated: boolean = false;

  creation: boolean = false;
  plane: boolean = false;
  employee: boolean = false;
  office: boolean = false;

  @ViewChild('year') year: any;
  @ViewChild('country') country: any;
  @ViewChild('people') people: any;
  @ViewChild('building') building: any;

  constructor(public language: LanguageService, private render: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.render.listen('window', 'scroll', () => {
      let position = this.people.nativeElement.getBoundingClientRect();
      if (position.top >= 0 && position.bottom <= window.innerHeight) {
        if (this.animated == false) {
          this.animateValue(this.year, 0, 1988, 1500);
          this.animateValue(this.country, 0, 16, 1500);
          this.animateValue(this.people, 0, 2300, 1500);
          this.animateValue(this.building, 0, 3, 1500);
          this.animated = true;
        }
      }
    });
  }

  animateValue(obj: any, start: any, end: any, duration: any) {
    let startTimestamp: any = null;
    const step = (timestamp: any) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.nativeElement.innerHTML = Math.floor(
        progress * (end - start) + start
      );
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
}
