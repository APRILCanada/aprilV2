import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';
import { BrokerService } from '../../services/brokers.service';
import { Broker } from '../../models/Broker';


@Component({
  selector: 'app-interface-brokers',
  templateUrl: './interface-brokers.component.html',
  styleUrls: ['./interface-brokers.component.scss']
})
export class InterfaceBrokersComponent implements OnInit {
  brokers: Broker[];
  totalLength: number;
  page: number = 1;
  searchValue: string;
  lang: string;

  constructor(
    private brokerService :  BrokerService,
    public language: LanguageService,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
   this.brokerService.getBrokers().subscribe((brokers) => {
    this.brokers = brokers
      this.totalLength = this.brokers.length;
      this.loader.loading(false);
      // console.log(this.brokers)
    });
  }

}

