import { Component, OnInit, OnDestroy, Renderer2} from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import * as data from '../data/menu';

@Component({
  selector: 'app-direct-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit, OnDestroy {
  menu: any = data.menu;
  private unlisten: () => void;

  constructor(public language: LanguageService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.unlisten = this.renderer.listen('window', 'scroll', () => {
      const navbar = document.querySelector('#navbar');
      if (window.pageYOffset > 50)
        navbar?.classList.add('diminished');
      else navbar?.classList.remove('diminished')
    })
  }

  ngOnDestroy() {
    this.unlisten()
  }

  // template method
  scrollToSection(section: string) {
    const options: ScrollIntoViewOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    }
    if (section === '3 easy steps')
      document.getElementById('3Steps')?.scrollIntoView(options);
    else if (section === 'Meet With Us')
      document.getElementById('Meet')?.scrollIntoView(options);
    else
      document.getElementById('Form')?.scrollIntoView(options);
  }
}
