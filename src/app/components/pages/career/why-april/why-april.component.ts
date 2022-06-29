import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-why-april',
  templateUrl: './why-april.component.html',
  styleUrls: ['./why-april.component.scss']
})
export class WhyAprilComponent implements OnInit {

  constructor(public language: LanguageService) { }

  ngOnInit(): void {
  }

}
