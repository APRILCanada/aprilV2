import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-contact-hero',
  templateUrl: './contact-hero.component.html',
  styleUrls: ['./contact-hero.component.scss'],
})
export class ContactHeroComponent implements OnInit {
  constructor(public language: LanguageService) {}

  ngOnInit(): void {}
}
