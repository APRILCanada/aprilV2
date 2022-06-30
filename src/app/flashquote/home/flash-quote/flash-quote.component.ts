import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { PageService } from '../../services/page.service';
import { ProvinceService } from '../../services/province.service';

@Component({
  selector: 'app-flash-quote',
  templateUrl: './flash-quote.component.html',
  styleUrls: ['./flash-quote.component.scss'],
})
export class FlashQuoteComponent implements OnInit {
  @Input() id: string;

  constructor(
    public language: LanguageService,
    public page: PageService,
    private route: ActivatedRoute,
    public prov: ProvinceService
  ) {}

  ngOnInit(): void {}
}
