import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LanguageService } from '../../../services/language.service'

@Component({
  selector: 'app-upper-nav',
  templateUrl: './upper-nav.component.html',
  styleUrls: ['./upper-nav.component.scss']
})
export class UpperNavComponent implements OnInit {
  
  lang: string;

  constructor( private router: Router, public language: LanguageService) { }

  ngOnInit(): void {
    this.lang = this.language.get()

  }  

  

}