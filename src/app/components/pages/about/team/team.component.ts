import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/services/language.service';
import { Director } from '../../models/directors';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  data: Director;


  directors: Director[] = [
    {
      fullName: 'Marie-Eve Paquette',
      title: {
        en: 'DCEO Operations and Customer Experience',
        fr: 'DGD Opérations et Expérience client',
      },
      picture: 'marie-eve.svg',
      email: 'marie.eve.paquette@april.ca',
      linkedIn: 'https://www.linkedin.com/in/marie-eve-paquette-baa-38aa0295/',
      color: '#004161',
    },

    {
      fullName: 'Florian Chabanette',
      title: {
        en: 'DCEO Offer and Performance',
        fr: 'DGD Offre et Performance',
      },
      picture: 'florian.svg',
      email: 'florian.chabanette@april.ca',
      linkedIn: 'https://www.linkedin.com/in/chabanette/',
      color: '#f7aa36',
    },
    {
      fullName: 'Bianca Collin',
      title: {
        en: 'HR Manager',
        fr: 'Responsable RH',
      },
      picture: 'bianca.svg',
      email: 'bianca.collin@april.ca',
      linkedIn: 'https://www.linkedin.com/in/bianca-collin-1179861b8/',
      color: '#d7488f',
    },
    {
      fullName: 'Stéphane Cochet',
      title: {
        en: 'CTO Infrastructure and Transactional Flows',
        fr: 'Directeur IT infra et flux transactionnels',
      },
      picture: 'stephane.svg',
      email: 'stephane.cochet@april.ca',
      linkedIn: 'https://www.linkedin.com/in/st%C3%A9phane-cochet-878101141/',
      color: '#639e30',
    },
  ];
;

  constructor(
    public language: LanguageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  close() {
    this.modalService.dismissAll();
  }

  openModal(content: any, data: any) {
    this.data = data;
    this.modalService.open(content, { size: 'lg', centered: true });
  }
}
