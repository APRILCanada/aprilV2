import { Component, Input, OnInit } from '@angular/core';
import { BrokerDTO } from 'src/app/flashquote/models/Broker';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() broker: BrokerDTO
  @Input() logo: string

  constructor(public language: LanguageService) { }

  ngOnInit(): void { }
}
