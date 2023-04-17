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
      content: this.fb.group({
        USP: this.fb.array([]),
        headline: this.fb.group({
          labelFr: [broker.content.headline.labelFr, [Validators.required]],
          labelEn: [broker.content.headline.labelEn, [Validators.required]]
        })
      })

    })
  }

  get USP() {
    // console.log(this.brokerForm)
    return (this.brokerForm.controls['content'] as FormGroup).controls['USP'] as FormArray;
  }

  addUSP() {

      const USPForm = this.fb.group({
          labelFr: ['', [Validators.required]],
          labelEn: ['', [Validators.required]]
      })
      this.USP?.push(USPForm)
      console.log(this.brokerForm)
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.brokerService.getBroker(this.id).subscribe((broker) => {
      this.broker = broker;
      this.brokerForm = this.createForm(broker)
      console.log(broker, this.brokerForm)
      this.loader.loading(false);
    });

    
    // this.brokerForm = new FormGroup({
    //   content: new FormGroup({
    //     UPS: new FormGroup({
    //       labelEn:  new FormControl(null),
    //       labelFr:  new FormControl(null)
    //     })
    //   }),
    //   
    //   logo: new FormControl(null),
    //   marketId: new FormControl(null),
    //   name: new FormControl(null),
    //   openingHours: new FormGroup({
    //     en:  new FormControl(null),
    //     fr:  new FormControl(null),

    //   }),
    //   styles: new FormGroup({
    //     buttons: new FormGroup({
    //       nav: new FormGroup({
    //         ['background-color'] : new FormControl(null),
    //         border : new FormControl(null),
    //         ['border-radius'] : new FormControl(null),
    //         color : new FormControl(null),
    //       }),
    //       outlined: new FormGroup({
    //         ['background-color'] : new FormControl(null),
    //         border : new FormControl(null),
    //         color : new FormControl(null),
    //       }),
    //       phone: new FormGroup({
    //         ['background-color'] : new FormControl(null),
    //         color : new FormControl(null),
    //       }),
    //     }),
    //     chips: new FormGroup({
    //       ['background-color'] : new FormControl(null),
    //       border : new FormControl(null),
    //       color : new FormControl(null),
    //     }),
    //     hero: new FormGroup({
    //       ['background-color'] : new FormControl(null),
    //       color : new FormControl(null),
    //       eligibilityLink: new FormGroup({
    //         color: new FormControl(null)
    //       }),
    //       image: new FormControl(null),
    //     }),
    //     prime: new FormGroup({
    //       ['background-color'] : new FormControl(null),
    //       color : new FormControl(null),
    //       header: new FormGroup({
    //         color: new FormControl(null)
    //       }),
    //       highlightedText: new FormGroup({
    //         color: new FormControl(null)
    //       }),
    //       text: new FormGroup({
    //         color: new FormControl(null)
    //       }),
    //     }),
    //     shared: new FormGroup({
    //       sectionHeaders: new FormGroup({
    //         color: new FormControl(null)
    //       }),
    //       stepper: new FormGroup({
    //         ['background-color']: new FormControl(null),
    //         border: new FormControl(null)
    //       }),
    //     }),
    //   })
    // });
    
  }

 
  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  completeIntro() {
    this.frCompleted = false;
    this.enCompleted = false;
    this.progress = 0;
    this.sectionIntro = true;
    this.sectionFr = false;
    this.sectionEn = false;
  }

  completeFr() {
    this.frCompleted = true;
    this.enCompleted = false;
    this.progress = 50;
    this.sectionIntro = false;
    this.sectionFr = true;
    this.sectionEn = false;
  }

  completeEn() {
    this.enCompleted = true;
    this.progress = 100;
    this.sectionIntro = false;
    this.sectionFr = false;
    this.sectionEn = true;
  }

  previous() {
    if (this.sectionFr == true) {
      this.sectionFr = false;
      this.sectionIntro = true;
      this.frCompleted = false;
      this.progress = 0;
    } else if (this.sectionEn == true) {
      this.sectionEn = false;
      this.sectionFr = true;
      this.enCompleted = false;
      this.progress = 50;
    }
  }

  next() {
    //  popup if error
    if (this.sectionIntro == true) {
      this.sectionIntro = false;
      this.sectionFr = true;
      this.frCompleted = true;
      this.progress = 50;
    } else if (this.sectionFr == true) {
      this.sectionFr = false;
      this.sectionEn = true;
      this.enCompleted = true;
      this.progress = 100;
    }
  }

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
