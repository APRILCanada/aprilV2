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
  ceo: Director = {
    fullName: 'Daphné de Vitton',
    title: {
      en: 'CEO APRIL Canada Inc',
      fr: 'Directrice Générale APRIL Canada Inc',
    },
    picture: 'daphne-devitton.png',
    email: 'daphne.devitton@april.ca',
    linkedIn: 'https://www.linkedin.com/in/daphn%C3%A9-de-vitton-363487/',
  };

  directors: Director[] = [
    {
      fullName: 'Patricia Desjardins',
      title: {
        en: 'Chief Underwriting Officer (CUO)',
        fr: 'Directeur de la souscription',
      },
      picture: 'patricia-desjardins.png',
      email: 'patricia.desjardins@april.ca',
      linkedIn: 'https://www.linkedin.com/in/patricia-desjardins-ab976924/',
    },
    {
      fullName: 'Marie-Eve Paquette',
      title: {
        en: 'APRIL Marine Canada Director',
        fr: 'Directrice APRIL Marine Canada',
      },
      picture: 'marie-eve-paquette.png',
      email: 'marie.eve.paquette@april.ca',
      linkedIn: 'https://www.linkedin.com/in/marie-eve-paquette-baa-38aa0295/',
    },

    {
      fullName: 'Samira Durand',
      title: {
        en: 'Chief Marketing and Digital Officer ',
        fr: 'Directrice Marketing et Digital',
      },
      picture: 'samira-durand.png',
      email: 'samira.durand@april.ca',
      linkedIn: 'https://www.linkedin.com/in/samira-durand/',
    },
    {
      fullName: 'Karine Chiasson',
      title: { en: 'Residential Director', fr: 'Directrice Résidentiel' },
      picture: 'karine-chiasson.png',
      email: 'karine.chiasson@april.ca',
      linkedIn: 'https://www.linkedin.com/in/karine-chiasson-234406148/',
    },
    {
      fullName: 'Sophie Bergeron',
      title: {
        en: 'Transport and Vehicles Line Director',
        fr: 'Directrice de lignes automobile, transport et commerciale',
      },
      picture: 'sophie-bergeron.png',
      email: 'sophie.bergeron@april.ca',
    },
    {
      fullName: 'Russel Morisson',
      title: {
        en: 'Insurance Relation Advisor',
        fr: 'Conseiller Relations Assureurs',
      },
      picture: 'russel-morisson.png',
      email: 'russel.morisson@april.ca',
      linkedIn: 'https://www.linkedin.com/in/russel-morrison-08561389/',
    },
    {
      fullName: 'John Azzarello',
      title: {
        en: 'Commercial Line Director',
        fr: 'Directeur de lignes commerciales',
      },
      picture: 'john-azzarello.png',
      email: 'john.azzarello@april.ca',
    },
  ];

  bdm: Director[] = [
    {
      fullName: 'Mathieu Pelletier',
      title: {
        en: 'Business development manager, Quebec',
        fr: 'Responsable du développement des affaires, Québec',
      },
      picture: 'mathieu-pelletier.png',
      email: 'mathieu.pelletier@april.ca',
      linkedIn: 'https://www.linkedin.com/in/mathieu-pelletier-b7382a70/',
    },
    {
      fullName: 'Tracey Paish',
      title: {
        en: 'Business development manager for Ontario and West',
        fr: 'Responsable du développement des affaires, Ontario et Ouest',
      },
      picture: 'tracey-paish.png',
      email: 'tracey.paish@april.ca',
      linkedIn: 'https://www.linkedin.com/in/tracey-paish-421b0449/',
    },
    {
      fullName: 'Camille Arian-Dupuis',
      title: {
        en: 'Business development manager for Ontario, APRIL Marine',
        fr: "Responsable du développement des affaires pour l'Ontario, APRIL Marine",
      },
      picture: 'camille-arian-dupuis.png',
      email: 'camille.arian@april.ca',
      linkedIn: 'https://www.linkedin.com/in/camille-arian-dupuis-3b23a1a8/',
    },
    {
      fullName: 'Stephan Bernard',
      title: {
        en: 'Business development manager for Quebec, APRIL Marine',
        fr: 'Responsable du développement des affaires pour le Québec, APRIL Marine',
      },
      picture: 'stephan.png',
      email: 'stephan.bernard@april.ca',
      linkedIn:
        'https://www.linkedin.com/in/stephan-bernard-78a436102?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BvZnGR4V9S1%2BAA166Lg%2FYeA%3D%3D',
    },
  ];

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
