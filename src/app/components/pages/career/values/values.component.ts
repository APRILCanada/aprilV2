import { Component,  OnInit} from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/services/language.service';
import * as data from './values'

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})
export class ValuesComponent implements OnInit {

  values = data.Values;
  
  constructor(public language: LanguageService, config: NgbAccordionConfig) {
    config.closeOthers = true;
   }


  ngOnInit(): void {
  }

}
