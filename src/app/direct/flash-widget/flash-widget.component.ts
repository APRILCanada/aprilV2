import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { PageService } from '../services/page.service';
import { ProvinceService } from '../services/province.service';

@Component({
  selector: 'app-flash-widget',
  templateUrl: './flash-widget.component.html',
  styleUrls: ['./flash-widget.component.scss'],
})
export class FlashWidgetComponent implements OnInit {
  id: string;

  constructor(
    public language: LanguageService,
    public page: PageService,
    private route: ActivatedRoute,
    public prov: ProvinceService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }
}
