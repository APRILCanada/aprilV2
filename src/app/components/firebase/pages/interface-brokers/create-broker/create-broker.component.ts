import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { BrokerService } from '../../../services/brokers.service';
import { LanguageService } from 'src/app/services/language.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { Broker } from '../../../models/Broker';

@Component({
  selector: 'app-create-broker',
  templateUrl: './create-broker.component.html',
  styleUrls: ['./create-broker.component.scss']
})
export class CreateBrokerComponent implements OnInit {
  id: string;
  brokerForm: FormGroup;
  sectionIntro: boolean = true;
  sectionFr: boolean = false;
  sectionEn: boolean = false;
  progress: number = 0;

  introCompleted: boolean = true;
  frCompleted: boolean = false;
  enCompleted: boolean = false;

  broker: Broker;

  constructor(
    private brokerService: BrokerService,
    public language: LanguageService,
    private router: Router,
    private modalService: NgbModal,
    private loader: LoadingService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  createForm(broker: Broker) {
    return this.fb.group({
      id: [broker.id, [Validators.required]],
      name: [broker.name, [Validators.required]],
      marketId: [broker.marketId, [Validators.required]],
      aprilonId: [broker.aprilonId, [Validators.required]],
      isActive: [broker.isActive, [Validators.required]],
      email: [broker.email, [Validators.required]],
      phone: [broker.phone, [Validators.required]],
      logo: [broker.logo, [Validators.required]],
      openingHours: this.fb.array(this.getOpeningHours(broker)),
      content: this.fb.group({
        USP: this.fb.array([
          this.fb.group({
          labelFr: [broker.content.USP[0].labelFr, [Validators.required]],
          labelEn: [broker.content.USP[0].labelEn, [Validators.required]]
          }),
          this.fb.group({
          labelFr: [broker.content.USP[1].labelFr, [Validators.required]],
          labelEn: [broker.content.USP[1].labelEn, [Validators.required]]
          }),
          this.fb.group({
          labelFr: [broker.content.USP[2].labelFr, [Validators.required]],
          labelEn: [broker.content.USP[2].labelEn, [Validators.required]]
          }),
        ]),
        headline: this.fb.group({
          labelFr: [broker.content.headline.labelFr, [Validators.required]],
          labelEn: [broker.content.headline.labelEn, [Validators.required]]
        })
      })

    })
  }

  get USP() {
    return (this.brokerForm.controls['content'] as FormGroup).controls['USP'] as FormArray;
  }

  // addUSP() {
  //     const USPForm = this.fb.group({
  //         labelFr: ['', [Validators.required]],
  //         labelEn: ['', [Validators.required]]
  //     })
  //     this.USP?.push(USPForm)
  // }
  // deleteUSP(index: number) {
  //     this.USP.removeAt(index)
  //     this.broker.content.USP.splice(index, 1)
  // }
  get openingHours() {
    return this.brokerForm.controls['openingHours'] as FormArray;
  }

  getOpeningHours(broker: Broker) {
    return [this.fb.group({
      labelFr: [broker.openingHours[0].labelFr, [Validators.required]],
      labelEn: [broker.openingHours[0].labelEn, [Validators.required]]
      }),
      this.fb.group({
      labelFr: [broker.openingHours[1].labelFr, [Validators.required]],
      labelEn: [broker.openingHours[1].labelEn, [Validators.required]]
      }),]
  }
 
  addHours() {
    const openingHoursForm = this.fb.group({
              labelFr: ['', [Validators.required]],
              labelEn: ['', [Validators.required]]
          })
          this.openingHours?.push(openingHoursForm)

  }
  removeHours(index: number) {
      this.openingHours.removeAt(index)
      this.broker.openingHours.splice(index, 1)
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.brokerService.getBroker(this.id).subscribe((broker) => {
      this.broker = broker;
      console.log(broker)
      this.brokerForm = this.createForm(broker)
      console.log(this.brokerForm)
      this.loader.loading(false);
    });    
  }

 
  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  // completeIntro() {
  //   this.frCompleted = false;
  //   this.enCompleted = false;
  //   this.progress = 0;
  //   this.sectionIntro = true;
  //   this.sectionFr = false;
  //   this.sectionEn = false;
  // }

  // previous() {
  //   if (this.sectionFr == true) {
  //     this.sectionFr = false;
  //     this.sectionIntro = true;
  //     this.frCompleted = false;
  //     this.progress = 0;
  //   } else if (this.sectionEn == true) {
  //     this.sectionEn = false;
  //     this.sectionFr = true;
  //     this.enCompleted = false;
  //     this.progress = 50;
  //   }
  // }

  // next() {
  //   if (this.sectionIntro == true) {
  //     this.sectionIntro = false;
  //     this.sectionFr = true;
  //     this.frCompleted = true;
  //     this.progress = 50;
  //   } else if (this.sectionFr == true) {
  //     this.sectionFr = false;
  //     this.sectionEn = true;
  //     this.enCompleted = true;
  //     this.progress = 100;
  //   }
  // }

  onSubmit() {
    this.broker = this.brokerForm.value;
    this.brokerService.createBroker(this.broker.id, this.broker);
    this.brokerForm.reset();
    this.router.navigate(['/interface/brokers']);
  }

  send() {
    this.onSubmit();
    this.modalService.dismissAll();
  }
}
