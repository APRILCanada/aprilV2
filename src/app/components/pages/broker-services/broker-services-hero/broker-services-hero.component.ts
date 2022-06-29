import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-broker-services-hero',
  templateUrl: './broker-services-hero.component.html',
  styleUrls: ['./broker-services-hero.component.scss'],
})
export class BrokerServicesHeroComponent implements OnInit {
  constructor(public loader: LoadingService) {}

  ngOnInit(): void {}
}
