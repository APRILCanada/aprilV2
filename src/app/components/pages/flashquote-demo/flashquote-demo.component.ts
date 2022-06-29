import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-flashquote-demo',
  templateUrl: './flashquote-demo.component.html',
  styleUrls: ['./flashquote-demo.component.scss'],
})
export class FlashquoteDemoComponent implements OnInit {
  constructor(public language: LanguageService) {}

  ngOnInit(): void {}
}
