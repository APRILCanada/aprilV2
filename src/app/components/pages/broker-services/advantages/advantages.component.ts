import { Component,  OnInit} from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/services/language.service';
import * as data from './advantages'


@Component({
  selector: 'app-advantages',
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.scss']
})
export class AdvantagesComponent implements OnInit {

 
  values = data.advantages;
  
  constructor(public language: LanguageService, config: NgbAccordionConfig) {
    config.closeOthers = true;
   }


  ngOnInit(): void {
  }

}

