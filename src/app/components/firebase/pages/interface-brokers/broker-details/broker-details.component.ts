import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';
import { BrokerService } from '../../../services/brokers.service';
import { Broker } from '../../../models/Broker';

@Component({
  selector: 'app-broker-details',
  templateUrl: './broker-details.component.html',
  styleUrls: ['./broker-details.component.scss']
})
export class BrokerDetailsComponent implements OnInit {
  id: string;
  broker: Broker;

  constructor(
    private brokerService: BrokerService,
    private router: Router,
    private route: ActivatedRoute,
    public language: LanguageService,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    // getIdfromUrl
    this.id = this.route.snapshot.params['id'];
    this.brokerService.getBroker(this.id).subscribe((broker) => {
      this.broker = broker;
      console.log(this.broker)
      this.loader.loading(false);
    });
  }

  onDelete() {
    this.brokerService.deleteBroker(this.broker);
    this.router.navigate(['/interface/brokers']);
  }
}
