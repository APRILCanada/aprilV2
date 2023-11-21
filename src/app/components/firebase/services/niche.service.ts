import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Niche } from '../models/Niche';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class NicheService {
  nichesCollection: AngularFirestoreCollection<Niche>;
  nicheDoc: AngularFirestoreDocument<Niche>;
  niches: Observable<Niche[]>;
  niche: any;

  constructor(private afs: AngularFirestore) {
    this.nichesCollection = afs.collection<Niche>('niches');
    this.niches = this.nichesCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Niche;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getNichesList() {
    return [
      {
        id: 'transport',
        name: 'Transportation',
        icon: 'automobile.svg',
        titleFr: 'Automobile',
        titleEn: 'Automobile',
        subsection: [
          {
            titleFr: 'Personnel',
            titleEn: 'Personal',
            products: [
              {
                titleFr: 'Automobile personnelle',
                titleEn: 'Personal automobile',
                id: 'automobile-personnelle',
              },
            ],
          },
          {
            titleFr: 'Commerciale',
            titleEn: 'Commercial',
            products: [
              {
                titleFr: 'Assurance pour déménageurs',
                titleEn: 'Movers Insurance',
                id: 'assurance-pour-demenageurs',
              },
              {
                titleFr: 'Assurance pour garagistes',
                titleEn: 'Garage Owners Insurance',
                id: 'assurance-pour-garagistes',
              },
              {
                titleFr: 'Assurance pour livreurs',
                titleEn: 'Insurance for Delivery Companies',
                id: 'assurance-pour-livreurs',
              },
              {
                titleFr: 'Assurance pour remorqueurs',
                titleEn: 'Insurance for Towing Companies',
                id: 'assurance-pour-remorqueurs',
              },
            ],
          },
        ],
      },
      {
        id: 'april-construction',
        name: 'Construction',
        icon: 'construction.svg',
        titleFr: 'Contracteurs',
        titleEn: 'Contractors',
        subsection: [
          {
            products: [
              {
                titleFr:
                  'Assurance chantiers nouvelle construction valeur 2 M$ et moins',
                titleEn:
                  'Construction insurance for new buildings worth 2M and less',
                id: 'assurance-chantiers-nouvelles-constructions',
              },
              {
                titleFr: 'Assurance pour entrepreneurs en construction',
                titleEn: 'Contractor Insurance',
                id: 'assurance-entrepreneurs-en-construction',
              },
              {
                titleFr: 'Assurance responsabilité civile excédentaire',
                titleEn: 'Umbrella & Excess Insurance',
                id: 'assurance-responsabilite-civile-excedentaire',
              },
              // {
              //   titleFr: 'Offre de cautionnement pour la RBQ',
              //   titleEn: 'Surety Bond Offer in Compliance with the RBQ',
              //   id: 'cautionnement-rbq',
              // },
              {
                titleFr:
                  'Assurance pour les petits travaux de construction et de rénovation',
                titleEn: 'Small COC & Renovation Insurance',
                id: 'small-coc-renovations-insurance',
              },
            ],
          },
        ],
      },
      {
        id: 'marine-plaisance',
        name: 'Marine',
        icon: 'marine.svg',
        titleFr: 'Marine de plaisance',
        titleEn: 'Personal Marine',
        subsection: [
          {
            products: [
              {
                titleFr: 'Marine de plaisance',
                titleEn: 'Personal Marine',
                id: 'marine-plaisance',
              },
            ],
          },
        ],
      },
      {
        id: 'commercial-marine',
        name: 'Commercial Marine',
        icon: 'commercial-marine.svg',
        titleFr: 'Marine commerciale',
        titleEn: 'Commercial Marine',
        subsection: [
          {
            products: [
              {
                titleFr: 'Petits navires commerciaux',
                titleEn: 'Small commercial boats',
                id: 'assurance-coque-et-machines',
              },
              {
                titleFr: 'Assurance cargo et entreposage',
                titleEn: 'Cargo and storage insurance',
                id: 'cargo-entreposage',
              },
              {
                titleFr: 'Assurance marinas et concessionnaires nautiques',
                titleEn: 'Marina and marine dealer insurance',
                id: 'marinas-concessionnaires-nautiques',
              },
              {
                titleFr: 'Responsabilité des services de cargo',
                titleEn: 'Motor Truck Cargo',
                id: 'motor-truck-cargo',
              },
              {
                titleFr: 'Assurance responsabilités maritimes',
                titleEn: 'Marine liability insurance',
                id: 'responsabilites-maritimes',
              },
              {
                titleFr: 'Assurance pour entreprise en logistique',
                titleEn: 'Logistic companies insurance',
                id: 'assurance-pour-entreprises-en-logistique',
              },
            ],
          },
        ],
      },
      {
        id: 'commercial-realty',
        name: 'Real Estate',
        icon: 'real-estate.svg',
        titleFr: 'Immobilier commercial',
        titleEn: 'Commercial Realty',
        subsection: [
          {
            products: [
              {
                titleFr: 'Assurance immobilière',
                titleEn: 'Property insurance',
                id: 'realty-insurance',
              },
              {
                titleFr: 'Assurance pour résidences étudiantes',
                titleEn: 'Student housing insurance',
                id: 'student-housing-insurance',
              },
              {
                titleFr: 'Gestionnaires immobilier',
                titleEn: 'Lessors Risks',
                id: 'lessors-risks',
              },
            ],
          },
        ],
      },
      {
        id: 'residentiel',
        name: 'Residential',
        icon: 'residential.svg',
        titleFr: 'Résidentiel',
        titleEn: 'Residential',
        subsection: [
          {
            products: [
              {
                titleFr: 'Assurance location court terme',
                titleEn: 'Short term rental insurance',
                id: 'assurance-location-court-terme',
              },
              {
                titleFr: "Assurance propriétaires résidant à l'étranger",
                titleEn: 'Homeowners living out of the country insurance',
                id: 'assurance-proprietaires-etranger',
              },
              {
                titleFr: 'Assurance bâtiment vacant',
                titleEn: 'Vacant building insurance',
                id: 'batiment-vacant',
              },
              {
                titleFr: 'Résidences et bâtiments à condos loués',
                titleEn: 'Rented residences and condo buildings',
                id: 'rented-residence-and-condos',
              },
              // {
              //   titleFr: 'Résidence haute valeur Intact Prestige',
              //   titleEn: 'Intact Prestige high value residence',
              //   id: 'residence-haute-valeur',
              // },
              {
                titleFr:
                  'Assurance pour résidences secondaires et saisonnières',
                titleEn: 'Seasonal and Secondary Homes insurance',
                id: 'residences-secondaires-saisonnieres',
              },
              {
                titleFr:
                  'Assurance situation financière non-standard et dossier plumitif',
                titleEn: 'Non-Standard Financial Situation',
                id: 'situation-financiere-plumitif',
              },
            ],
          },
        ],
      },
      {
        id: 'professionals-businesses',
        name: 'Professionals & business',
        icon: 'other-commercial.svg',
        titleFr: 'Professionnels et entreprises',
        titleEn: 'Professionals and Businesses',
        subsection: [
          {
            titleEn: 'Health, Beauty & Well-being Professionals',
            titleFr: 'Professionnels de la santé, beauté et bien-être',
            products: [
              {
                titleFr:
                  'Assurance pour les professionnels de la beauté et du style, Santé et bien-être, Conseillers et formateurs',
                titleEn:
                  'Insurance for Beauty & Style Professionals, Health & Wellbeing, Conselors & Trainers',
                id: 'medical-malpractice-insurance',
              },
              {
                titleFr: 'Centres de remise en forme',
                titleEn: 'Fitness Centers',
                id: 'fitness-center',
              },
            ],
          },
          {
            titleFr:
              'Erreurs et omissions des professionnels de la technologie',
            titleEn: 'Technology Professionals Errors & Omissions',
            products: [
              {
                titleFr: 'Responsabilité civile professionnelle',
                titleEn: 'Professional Liability Insurance',
                id: 'professional-liability',
              },
              {
                titleFr:
                  'Erreurs et omissions des professionnels de la technologie',
                titleEn: 'Technology Professionals Errors & Omissions',
                id: 'technology-professionals-eo',
              },
            ],
          },
          {
            titleFr: 'Cyber',
            titleEn: 'Cyber',
            products: [
              {
                titleFr: 'Assurance cyber risques',
                titleEn: 'Cyber risks insurance',
                id: 'assurance-cyber-risque',
              },
            ],
          },
          {
            titleFr: 'Organismes à but non lucratif',
            titleEn: 'Non-profit Organizations',
            products: [
              {
                titleFr: 'Assurance pour lieux de cultes',
                titleEn: 'Houses of Worship Insurance',
                id: 'houses-of-worship',
              },
            ],
          },
          {
            titleFr: 'Services professionnels et techniques',
            titleEn: 'Professional and technical services',
            products: [
              {
                titleFr: 'Assurance rappel de produit',
                titleEn: 'Product Recall Insurance',
                id: 'product-recall-insurance',
              },
              {
                titleFr: 'Assurance contamination de produit',
                titleEn: 'Product Contamination Insurance',
                id: 'product-contamination-insurance',
              },
              {
                titleFr: 'Assurance conciergerie',
                titleEn: 'Janitoral Insurance',
                id: 'janitoral-insurance',
              },
              // {
              //   titleFr: 'Assurance responsabilité civile excédentaire',
              //   titleEn: 'Umbrella & Excess Insurance',
              //   id: 'assurance-responsabilite-civile-excedentaire',
              // },
              {
                titleFr: 'Assurance bijoutiers & beaux-arts',
                titleEn: 'Jewellers’ Block & Fine Arts',
                id: 'jewellers-block-fine-arts',
              },
            ],
          },
          {
            titleFr: 'Ferme',
            titleEn: 'Farm',
            products: [
              {
                titleFr: 'Assurance agricole',
                titleEn: 'Farm Insurance',
                id: 'farm-insurance',
              },
            ],
          },
          {
            titleFr: 'Fabriquants et grossistes',
            titleEn: 'Manufacturers and wholesalers',
            products: [
              {
                titleFr: 'Assurance pour fabricants et les grossistes',
                titleEn: 'Manufacturing & Wholesaler Insurance',
                id: 'manuacturer-wholesaler-insurance',
              },
            ],
          },
          // {
          //   titleFr: 'Hébergement et restauration',
          //   titleEn: 'Accommodation and catering',
          //   products: [
          //     {
          //       titleFr: 'Assurance pour bars et restaurants',
          //       titleEn: 'Bar and restaurant insurance',
          //       id: 'Bar-restaurant-insurance',
          //     },
          //   ],
          // },
        ],
      },
    ];
  }

  getNiches(): Observable<Niche[]> {
    return this.niches;
  }

  createNiche(id: any, niche: Niche) {
    this.nichesCollection.doc(id).set(niche);
  }

  getNiche(id: string): Observable<Niche> {
    this.nicheDoc = this.afs.doc<Niche>(`niches/${id}`);
    this.niche = this.nicheDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Niche;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.niche;
  }

  updateNiche(niche: Niche) {
    this.nicheDoc = this.afs.doc(`niches/${niche.id}`);
    this.nicheDoc.update(niche);
  }

  deleteNiche(niche: Niche) {
    this.nicheDoc = this.afs.doc(`niches/${niche.id}`);
    this.nicheDoc.delete();
  }
}
