import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { BrokerService } from '../../../services/brokers.service';
import { LanguageService } from 'src/app/services/language.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { Broker } from '../../../models/Broker';
import { Label } from '../../../models/label';

@Component({
  selector: 'app-create-broker',
  templateUrl: './create-broker.component.html',
  styleUrls: ['./create-broker.component.scss']
})
export class CreateBrokerComponent implements OnInit {
  id: string;
  brokerForm: FormGroup;
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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] || null;
    if(this.id){
      this.brokerService.getBroker(this.id).subscribe((broker) => {
      this.broker = broker;
      this.brokerForm = this.createForm(broker)
      this.loader.loading(false);
    })} else {
      this.broker = new Broker();
      this.brokerForm = this.createForm(this.broker)
      this.loader.loading(false);
    }
      
  }

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
        USP: this.fb.array(this.getUSP(broker.content?.USP)),
        headline: this.fb.group({
          labelFr: [broker.content?.headline.labelFr, [Validators.required]],
          labelEn: [broker.content?.headline.labelEn, [Validators.required]]
        }),
        subTitle: this.fb.group({
          labelFr: [broker.content?.subTitle?.labelFr, [Validators.required]],
          labelEn: [broker.content?.subTitle?.labelEn, [Validators.required]]
        })
      }),
      styles: this.fb.group({
        buttons: this.fb.group({
          nav: this.fb.group({
            ['background-color']: [broker.styles?.buttons?.nav['background-color'], [Validators.required]], 
            border: [broker.styles?.buttons?.nav.border, [Validators.required]], 
            ['border-radius']: [broker.styles?.buttons?.nav['border-radius'], [Validators.required]], 
            color: [broker.styles?.buttons?.nav.color, [Validators.required]], 
          }),
          outlined: this.fb.group({
            ['background-color']: [broker.styles?.buttons?.outlined['background-color'], [Validators.required]], 
            border: [broker.styles?.buttons?.outlined.border, [Validators.required]], 
            color: [broker.styles?.buttons?.outlined.color, [Validators.required]], 
          }),
          phone: this.fb.group({
            ['background-color']: [broker.styles?.buttons.phone['background-color'], [Validators.required]], 
            color: [broker.styles?.buttons?.phone.color, [Validators.required]], 
          })
        }),
        chips: this.fb.group({
          ['background-color']: [broker.styles?.chips['background-color'], [Validators.required]], 
          border: [broker.styles?.chips.border, [Validators.required]], 
          color: [broker.styles?.chips.color, [Validators.required]], 
        }),
        hero: this.fb.group({
          alignment: [broker.styles?.hero.alignment, [Validators.required]], 
          ['background-color']: [broker.styles?.hero['background-color'], [Validators.required]], 
          color: [broker.styles?.hero.color, [Validators.required]], 
          ['font-family']: [broker.styles?.hero['font-family'], [Validators.required]], 
          image: [broker.styles?.hero.image, [Validators.required]],
          size: [broker.styles?.hero.size, [Validators.required]],
          eligibilityLink: this.fb.group({
            color: [broker.styles?.hero.eligibilityLink.color, [Validators.required]], 
            ['font-family']: [broker.styles?.hero.eligibilityLink['font-family'], [Validators.required]], 
          }),
          subTitle: this.fb.group({
            ['font-family']: [broker.styles?.hero.subTitle['font-family'], [Validators.required]], 
            size: [broker.styles?.hero.subTitle.size, [Validators.required]], 
          }),
        }),
        prime: this.fb.group({
          ['background-color']: [broker.styles?.prime['background-color'], [Validators.required]], 
          color: [broker.styles?.prime.color, [Validators.required]], 
          header: this.fb.group({
            color: [broker.styles?.prime.header.color, [Validators.required]], 
          }),
          highlightedText: this.fb.group({
            color: [broker.styles?.prime.highlightedText.color, [Validators.required]], 
          }),
          text: this.fb.group({
            color: [broker.styles?.prime.text.color, [Validators.required]], 
          }),
        }),
        shared: this.fb.group({
          sectionHeaders: this.fb.group({
            color: [broker.styles?.shared.sectionHeaders.color, [Validators.required]], 
          }),
          stepper: this.fb.group({
            ['background-color']: [broker.styles?.shared.stepper['background-color'], [Validators.required]], 
            border: [broker.styles?.shared.stepper.border, [Validators.required]], 
          }),
        }),
      })

    })
  }

  get USP() {
    return (this.brokerForm.controls['content'] as FormGroup).controls['USP'] as FormArray;
  }

  get openingHours() {
    return this.brokerForm.controls['openingHours'] as FormArray;
  }

  getOpeningHours(broker: Broker) {
    let hoursArr: any[] = [];
    
    if(broker?.openingHours?.length > 0) {
      broker.openingHours.forEach((hour) => {
        hoursArr.push (this.fb.group({
          labelFr: [hour.labelFr, [Validators.required]],
          labelEn: [hour.labelEn, [Validators.required]]
        }))
      })
    }
    return hoursArr;
  }
  getUSP(usp: Label[]) {
    console.log(this.id)
    let uspArr: any[] = [];
    for (let i = 0; i < 3; i++) {
      uspArr.push(this.fb.group({
          labelFr: [!this.id ? "" : usp[i].labelFr , [Validators.required]],
          labelEn: [!this.id ? "" : usp[i].labelEn , [Validators.required]]
          }))
    }
    return uspArr;
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
      if(this.id)this.broker.openingHours.splice(index, 1)
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  onSubmit() {
    this.broker = this.brokerForm.value;
    if(this.id) {
      this.brokerService.updateBroker(this.broker);
      this.router.navigate(['/interface/brokers' + this.broker.id]);
    } else {
     this.brokerService.createBroker(this.broker.id, this.broker);
     this.router.navigate(['/interface/brokers']);
    }
  }

  send() {
    this.onSubmit();
    this.modalService.dismissAll();
  }
}
