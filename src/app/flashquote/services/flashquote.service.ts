import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FlashFormDTO } from '../models/Flashquote';

@Injectable({
  providedIn: 'root',
})
export class FlashquoteService {

  dataJSON = {
    marketId: 76,
    questions: [
      {
        id: 60,
        title: {
          LabelFr: "Nom du proposant",
          LabelEn: "Applicant name"
        },
        type: "TEXT",
        isRequired: true,
        responses: [],
        rules: [],
        identifier: "Applicant-FullName",
        defaultValue: "",
        unit: {
          LabelFr: "",
          LabelEn: ""
        },
        minLength: "",
        maxLength: "",
        mask: ""
      },
      {
        id: 62,
        title: {
          LabelFr: "Nom de la compagnie (s'il y a lieu)",
          LabelEn: "Company name (if applicable)"
        },
        type: "TEXT",
        isRequired: false,
        responses: [],
        rules: [],
        identifier: "CompanyName",
        defaultValue: "",
        unit: {
          LabelFr: "",
          LabelEn: ""
        },
        minLength: "",
        maxLength: "",
        mask: ""
      },
      {
        id: 1532,
        title: {
          LabelFr: "Adresse courriel",
          LabelEn: "Email address"
        },
        type: "TEXT",
        isRequired: true,
        responses: [],
        rules: [],
        identifier: "EmailAddress",
        defaultValue: "",
        unit: {
          LabelFr: "",
          LabelEn: ""
        },
        minLength: "",
        maxLength: "",
        mask: ""
      },
      {
        id: 1533,
        title: {
          LabelFr: "Numéro de téléphone",
          LabelEn: "Phone number"
        },
        type: "NUMBER",
        isRequired: true,
        responses: [],
        rules: [],
        identifier: "PhoneNumber",
        defaultValue: "",
        unit: {
          LabelFr: "",
          LabelEn: ""
        },
        minLength: "",
        maxLength: "",
        mask: ""
      },
      {
        id: 2879,
        title: {
          LabelFr: "Quelles sont les activités du proposant?",
          LabelEn: "What are the applicant busines activities?"
        },
        type: "MULTIPLE",
        isRequired: true,
        responses: [
          {
            id: 12569,
            responseKey: "922",
            label: {
              LabelFr: "Menuiserie hors atelier : armoire de cuisine, escalier, balcon et autres produits préfabriqués en bois  (1752a)",
              LabelEn: "Carpentry outside workshop: kitchen cabinet, staircase, balcony and other prefabricated wooden products (1752a)"
            },
            showOrder: 0
          },
          {
            id: 12570,
            responseKey: "95",
            label: {
              LabelFr: "Électricien : secteurs commercial, industriel, institutionnel (1736)",
              LabelEn: "Electrician: commercial, industrial, institutional sectors (1736)"
            },
            showOrder: 0
          },
          {
            id: 12571,
            responseKey: "53",
            label: {
              LabelFr: "Clôture : installation et réparation - excluant fabrication (1522)",
              LabelEn: "Fence: installation and repair - excluding manufacturing (1522)"
            },
            showOrder: 0
          },
          {
            id: 12572,
            responseKey: "603",
            label: {
              LabelFr: "Fumigation, désinsectisation, dératisation à l'intérieur des bâtiments ou bateaux (7391)",
              LabelEn: "Fumigation, exterminating operations inside buildings or vessels (7391)"
            },
            showOrder: 0
          },
          {
            id: 12573,
            responseKey: "607",
            label: {
              LabelFr: "Nettoyage de meubles, tentures, moquettes chez les clients (7395)",
              LabelEn: "Furniture, drapery, dug cleaning on customer's premises (7395)"
            },
            showOrder: 0
          },
          {
            id: 12574,
            responseKey: "21",
            label: {
              LabelFr: "Aménagement paysager : jardinier et paysagiste (735)",
              LabelEn: "Landscaping: gardener and landscaper (735)"
            },
            showOrder: 0
          },
          {
            id: 12576,
            responseKey: "106",
            label: {
              LabelFr: "Recouvrement de sol : bois, tapis, vinyle (1756)",
              LabelEn: "Floor covering: wood, carpet, vinyl (1756)"
            },
            showOrder: 0
          },
          {
            id: 12577,
            responseKey: "107",
            label: {
              LabelFr: "Décorateur d'intérieur (1757)",
              LabelEn: "Interior decorator (1757)"
            },
            showOrder: 0
          },
          {
            id: 12578,
            responseKey: "606",
            label: {
              LabelFr: "Concierge (7394)",
              LabelEn: "Janitorial service (7394)"
            },
            showOrder: 0
          },
          {
            id: 12579,
            responseKey: "91",
            label: {
              LabelFr: "Électricien : secteurs résidentiel et commercial (1731)",
              LabelEn: "Electrician: residential and commercial sectors (1731)"
            },
            showOrder: 0
          },
          {
            id: 12580,
            responseKey: "98",
            label: {
              LabelFr: "Maçonnerie : brique, pierre, carrelage, marbre, mosaïque, stuc (1743)",
              LabelEn: "Masonry: bricklaying, stonework, tile, marble, mosaic, stuccoing (1743)"
            },
            showOrder: 0
          },
          {
            id: 12581,
            responseKey: "113",
            label: {
              LabelFr: "Installation de porte, porte de garage, fenêtre, auvent métallique (1766)",
              LabelEn: "Installation of door, garage door, window, metal awning (1766)"
            },
            showOrder: 0
          },
          {
            id: 12582,
            responseKey: "104",
            label: {
              LabelFr: "Peinture et décoration - sans emploi de pistolets (1754)",
              LabelEn: "Painting and decorating - excluding spray paint (1754)"
            },
            showOrder: 0
          },
          {
            id: 12583,
            responseKey: "105",
            label: {
              LabelFr: "Peinture et décoration - avec emploi de pistolets (1755)",
              LabelEn: "Painting and decorating - including spray paint (1755)"
            },
            showOrder: 0
          },
          {
            id: 12584,
            responseKey: "99",
            label: {
              LabelFr: "Système d’intérieur, pose de gypse, cloison sèche, plâtrage et lattage (1744)",
              LabelEn: "Interior system, gypsum installation, drywall, plastering and battening (1744)"
            },
            showOrder: 0
          },
          {
            id: 12586,
            responseKey: "61",
            label: {
              LabelFr: "Enseignes - sans circuits électriques (1532)",
              LabelEn: "Signs - without electrical circuits (1532)"
            },
            showOrder: 0
          },
          {
            id: 12587,
            responseKey: "63",
            label: {
              LabelFr: "Antennes de télévision (1534)",
              LabelEn: "Television antennae (1534)"
            },
            showOrder: 0
          },
          {
            id: 12588,
            responseKey: "100",
            label: {
              LabelFr: "Pose de carrelage, céramique, mosaïque - excluant maçonnerie, égout, évacuation, plafond, terrazzo (1745)",
              LabelEn: "Tilework - excluding masonry, sewers, drains, ceiling, terrazzo (1745)"
            },
            showOrder: 0
          },
          {
            id: 12589,
            responseKey: "22",
            label: {
              LabelFr: "Arbres : enlèvement, taille, élagage (736)",
              LabelEn: "Tree removal, trimming, pruning (736)"
            },
            showOrder: 0
          },
          {
            id: 12590,
            responseKey: "923",
            label: {
              LabelFr: "Enseignes - avec circuits électriques - excluant la fabrication (1532a)",
              LabelEn: "Signs - with electrical circuits - excluding manufacturing (1532a)"
            },
            showOrder: 0
          },
          {
            id: 12591,
            responseKey: "921",
            label: {
              LabelFr: "Installation (a) de recouvrement extérieur de bâtiment : vinyle, aluminium, acier - sauf maçonnerie (1743a)",
              LabelEn: "Installation (a) of exterior building covering: vinyl, aluminum, steel  - except masonry (1743a)"
            },
            showOrder: 0
          },
          {
            id: 12592,
            responseKey: "920",
            label: {
              LabelFr: "Installation (b) de gouttière (1743b)",
              LabelEn: "Installation (b) of gutter (1743b)"
            },
            showOrder: 0
          },
          {
            id: 12593,
            responseKey: "919",
            label: {
              LabelFr: "Installation (c) de scellant pour portes et fenêtres (1743c)",
              LabelEn: "Installation (c) of sealer for doors and windows (1743c)"
            },
            showOrder: 0
          },
          {
            id: 12594,
            responseKey: "102",
            label: {
              LabelFr: "Charpenterie hors atelier : structure de bâtiment en bois (1752)",
              LabelEn: "Carpentry outside workshop: wooden building structure (1752)"
            },
            showOrder: 0
          },
          {
            id: 12596,
            responseKey: "48",
            label: {
              LabelFr: "Démolition (mur porteur ou bâtiment complet) (1512)",
              LabelEn: "Demolition (load-bearing wall or complete building) (1512)"
            },
            showOrder: 0
          },
          {
            id: 12597,
            responseKey: "50",
            label: {
              LabelFr: "Soutènement/étaiement, reprise en sous-oeuvre, travaux en caisson, battage de pieux (1514)",
              LabelEn: "Support work, underpinning operations, caisson work, pile driving (1514)"
            },
            showOrder: 0
          },
          {
            id: 12598,
            responseKey: "51",
            label: {
              LabelFr: "Utilisation d'explosifs (1515)",
              LabelEn: "Blasting Contractors (1515)"
            },
            showOrder: 0
          },
          {
            id: 12599,
            responseKey: "56",
            label: {
              LabelFr: "Déneigement (1525)",
              LabelEn: "Snow Removal, Clearing, Ploughing (1525)"
            },
            showOrder: 0
          },
          {
            id: 12600,
            responseKey: "62",
            label: {
              LabelFr: "Enlèvement/installation de reservoir (1533)",
              LabelEn: "Removal or installation of tank (1533)"
            },
            showOrder: 0
          },
          {
            id: 12601,
            responseKey: "72",
            label: {
              LabelFr: "Routes, rues y compris revêtement ou décapage (1631)",
              LabelEn: "Highway, Street, Road including Paving, Resurfacing (1631)"
            },
            showOrder: 0
          },
          {
            id: 12602,
            responseKey: "80",
            label: {
              LabelFr: "Plomberie, y compris spa (1711)",
              LabelEn: "Plumbing, Including Hot Tubs (1711)"
            },
            showOrder: 0
          },
          {
            id: 12603,
            responseKey: "83",
            label: {
              LabelFr: "Extincteur automatique de bâtiment - (gicleurs) (1714)",
              LabelEn: "Automatic Sprinklers (1714)"
            },
            showOrder: 0
          },
          {
            id: 12604,
            responseKey: "84",
            label: {
              LabelFr: "Ventilation/Climatisation/Chauffage (HVAC) (1715)",
              LabelEn: "Heating/Ventilation/Air-Conditioning (HVAC) (1715)"
            },
            showOrder: 0
          },
          {
            id: 12605,
            responseKey: "96",
            label: {
              LabelFr: "Fondation (1741)",
              LabelEn: "Foundation (1741)"
            },
            showOrder: 0
          },
          {
            id: 12606,
            responseKey: "109",
            label: {
              LabelFr: "Recouvrement extérieur de bâtiment (1762)",
              LabelEn: "Sheet Metal - Away from Shop (1762)"
            },
            showOrder: 0
          },
          {
            id: 12607,
            responseKey: "118",
            label: {
              LabelFr: "Excavation (1774)",
              LabelEn: "Excavation (1774)"
            },
            showOrder: 0
          },
          {
            id: 12608,
            responseKey: "119",
            label: {
              LabelFr: "Toitures (bardeaux) (1775)",
              LabelEn: "Roofing - Residential (Shingle) (1775)"
            },
            showOrder: 0
          },
          {
            id: 12609,
            responseKey: "120",
            label: {
              LabelFr: "Toitures (à chaud) (1776)",
              LabelEn: "Roofing - Other (Hot Tar, etc.) (1776)"
            },
            showOrder: 0
          },
          {
            id: 12610,
            responseKey: "121",
            label: {
              LabelFr: "Travaux d'étanchéité (1777)",
              LabelEn: "Waterproofing Operations (1777)"
            },
            showOrder: 0
          },
          {
            id: 12611,
            responseKey: "126",
            label: {
              LabelFr: "Amiante, plomb, réduction UFI, atténuation des impacts du radon, décontamination des réservoirs (1782)",
              LabelEn: "Asbestos, Lead, UFI Abatement, Radon Mitigation, Tank Remediation (1782)"
            },
            showOrder: 0
          },
          {
            id: 12612,
            responseKey: "608",
            label: {
              LabelFr: "Systèmes d'alarme - Installation (mais non la réparation du matériel à éteindre les incendies) (7396)",
              LabelEn: "Alarm System - Installation (excluding repair of fire suppression equipment)(7396)"
            },
            showOrder: 0
          },
          {
            id: 12614,
            responseKey: "47",
            label: {
              LabelFr: "Travaux de soutènement ou déplacement de bâtiment (1511)",
              LabelEn: "Support work or relocation of buildings (1511)"
            },
            showOrder: 0
          },
          {
            id: 12732,
            responseKey: "927",
            label: {
              LabelFr: "Vitrerie (1535)",
              LabelEn: "Glazier Work (1535)"
            },
            showOrder: 0
          },
          {
            id: 12736,
            responseKey: "133",
            label: {
              LabelFr: "Piscines hors terre - incluant accessoires, installation, réparation, ouverture et fermeture (1831)",
              LabelEn: "Pools: above ground - including accessories, installation, repair, opening and closing (1831)"
            },
            showOrder: 0
          }
        ],
        rules: [
          {
            id: 2100,
            questionId: 2879,
            operation: "NOT_EMPTY",
            action: "RETRIEVE_RESPONSE",
            value: "",
            destinationId: 2885,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2163,
            questionId: 2879,
            operation: "NOT_EMPTY",
            action: "SHOW",
            value: "",
            destinationId: 2885,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          }
        ],
        identifier: "Code",
        defaultValue: "",
        unit: {
          LabelFr: "",
          LabelEn: ""
        },
        minLength: "",
        maxLength: "",
        mask: ""
      },
      {
        id: 2885,
        title: {
          LabelFr: "Pourcentage des travaux effectués pour chaque activités",
          LabelEn: "Percentage of work done for each activities"
        },
        type: "REPARTITION",
        isRequired: true,
        responses: [
          {
            id: 12569,
            responseKey: "922",
            label: {
              LabelFr: "Menuiserie hors atelier : armoire de cuisine, escalier, balcon et autres produits préfabriqués en bois  (1752a)",
              LabelEn: "Carpentry outside workshop: kitchen cabinet, staircase, balcony and other prefabricated wooden products (1752a)"
            },
            showOrder: 0
          },
          {
            id: 12570,
            responseKey: "95",
            label: {
              LabelFr: "Électricien : secteurs commercial, industriel, institutionnel (1736)",
              LabelEn: "Electrician: commercial, industrial, institutional sectors (1736)"
            },
            showOrder: 0
          },
          {
            id: 12571,
            responseKey: "53",
            label: {
              LabelFr: "Clôture : installation et réparation - excluant fabrication (1522)",
              LabelEn: "Fence: installation and repair - excluding manufacturing (1522)"
            },
            showOrder: 0
          },
          {
            id: 12572,
            responseKey: "603",
            label: {
              LabelFr: "Fumigation, désinsectisation, dératisation à l'intérieur des bâtiments ou bateaux (7391)",
              LabelEn: "Fumigation, exterminating operations inside buildings or vessels (7391)"
            },
            showOrder: 0
          },
          {
            id: 12573,
            responseKey: "607",
            label: {
              LabelFr: "Nettoyage de meubles, tentures, moquettes chez les clients (7395)",
              LabelEn: "Furniture, drapery, dug cleaning on customer's premises (7395)"
            },
            showOrder: 0
          },
          {
            id: 12574,
            responseKey: "21",
            label: {
              LabelFr: "Aménagement paysager : jardinier et paysagiste (735)",
              LabelEn: "Landscaping: gardener and landscaper (735)"
            },
            showOrder: 0
          },
          {
            id: 12576,
            responseKey: "106",
            label: {
              LabelFr: "Recouvrement de sol : bois, tapis, vinyle (1756)",
              LabelEn: "Floor covering: wood, carpet, vinyl (1756)"
            },
            showOrder: 0
          },
          {
            id: 12577,
            responseKey: "107",
            label: {
              LabelFr: "Décorateur d'intérieur (1757)",
              LabelEn: "Interior decorator (1757)"
            },
            showOrder: 0
          },
          {
            id: 12578,
            responseKey: "606",
            label: {
              LabelFr: "Concierge (7394)",
              LabelEn: "Janitorial service (7394)"
            },
            showOrder: 0
          },
          {
            id: 12579,
            responseKey: "91",
            label: {
              LabelFr: "Électricien : secteurs résidentiel et commercial (1731)",
              LabelEn: "Electrician: residential and commercial sectors (1731)"
            },
            showOrder: 0
          },
          {
            id: 12580,
            responseKey: "98",
            label: {
              LabelFr: "Maçonnerie : brique, pierre, carrelage, marbre, mosaïque, stuc (1743)",
              LabelEn: "Masonry: bricklaying, stonework, tile, marble, mosaic, stuccoing (1743)"
            },
            showOrder: 0
          },
          {
            id: 12581,
            responseKey: "113",
            label: {
              LabelFr: "Installation de porte, porte de garage, fenêtre, auvent métallique (1766)",
              LabelEn: "Installation of door, garage door, window, metal awning (1766)"
            },
            showOrder: 0
          },
          {
            id: 12582,
            responseKey: "104",
            label: {
              LabelFr: "Peinture et décoration - sans emploi de pistolets (1754)",
              LabelEn: "Painting and decorating - excluding spray paint (1754)"
            },
            showOrder: 0
          },
          {
            id: 12583,
            responseKey: "105",
            label: {
              LabelFr: "Peinture et décoration - avec emploi de pistolets (1755)",
              LabelEn: "Painting and decorating - including spray paint (1755)"
            },
            showOrder: 0
          },
          {
            id: 12584,
            responseKey: "99",
            label: {
              LabelFr: "Système d’intérieur, pose de gypse, cloison sèche, plâtrage et lattage (1744)",
              LabelEn: "Interior system, gypsum installation, drywall, plastering and battening (1744)"
            },
            showOrder: 0
          },
          {
            id: 12586,
            responseKey: "61",
            label: {
              LabelFr: "Enseignes - sans circuits électriques (1532)",
              LabelEn: "Signs - without electrical circuits (1532)"
            },
            showOrder: 0
          },
          {
            id: 12587,
            responseKey: "63",
            label: {
              LabelFr: "Antennes de télévision (1534)",
              LabelEn: "Television antennae (1534)"
            },
            showOrder: 0
          },
          {
            id: 12588,
            responseKey: "100",
            label: {
              LabelFr: "Pose de carrelage, céramique, mosaïque - excluant maçonnerie, égout, évacuation, plafond, terrazzo (1745)",
              LabelEn: "Tilework - excluding masonry, sewers, drains, ceiling, terrazzo (1745)"
            },
            showOrder: 0
          },
          {
            id: 12589,
            responseKey: "22",
            label: {
              LabelFr: "Arbres : enlèvement, taille, élagage (736)",
              LabelEn: "Tree removal, trimming, pruning (736)"
            },
            showOrder: 0
          },
          {
            id: 12590,
            responseKey: "923",
            label: {
              LabelFr: "Enseignes - avec circuits électriques - excluant la fabrication (1532a)",
              LabelEn: "Signs - with electrical circuits - excluding manufacturing (1532a)"
            },
            showOrder: 0
          },
          {
            id: 12591,
            responseKey: "921",
            label: {
              LabelFr: "Installation (a) de recouvrement extérieur de bâtiment : vinyle, aluminium, acier - sauf maçonnerie (1743a)",
              LabelEn: "Installation (a) of exterior building covering: vinyl, aluminum, steel  - except masonry (1743a)"
            },
            showOrder: 0
          },
          {
            id: 12592,
            responseKey: "920",
            label: {
              LabelFr: "Installation (b) de gouttière (1743b)",
              LabelEn: "Installation (b) of gutter (1743b)"
            },
            showOrder: 0
          },
          {
            id: 12593,
            responseKey: "919",
            label: {
              LabelFr: "Installation (c) de scellant pour portes et fenêtres (1743c)",
              LabelEn: "Installation (c) of sealer for doors and windows (1743c)"
            },
            showOrder: 0
          },
          {
            id: 12594,
            responseKey: "102",
            label: {
              LabelFr: "Charpenterie hors atelier : structure de bâtiment en bois (1752)",
              LabelEn: "Carpentry outside workshop: wooden building structure (1752)"
            },
            showOrder: 0
          },
          {
            id: 12596,
            responseKey: "48",
            label: {
              LabelFr: "Démolition (mur porteur ou bâtiment complet) (1512)",
              LabelEn: "Demolition (load-bearing wall or complete building) (1512)"
            },
            showOrder: 0
          },
          {
            id: 12597,
            responseKey: "50",
            label: {
              LabelFr: "Soutènement/étaiement, reprise en sous-oeuvre, travaux en caisson, battage de pieux (1514)",
              LabelEn: "Support work, underpinning operations, caisson work, pile driving (1514)"
            },
            showOrder: 0
          },
          {
            id: 12598,
            responseKey: "51",
            label: {
              LabelFr: "Utilisation d'explosifs (1515)",
              LabelEn: "Blasting Contractors (1515)"
            },
            showOrder: 0
          },
          {
            id: 12599,
            responseKey: "56",
            label: {
              LabelFr: "Déneigement (1525)",
              LabelEn: "Snow Removal, Clearing, Ploughing (1525)"
            },
            showOrder: 0
          },
          {
            id: 12600,
            responseKey: "62",
            label: {
              LabelFr: "Enlèvement/installation de reservoir (1533)",
              LabelEn: "Removal or installation of tank (1533)"
            },
            showOrder: 0
          },
          {
            id: 12601,
            responseKey: "72",
            label: {
              LabelFr: "Routes, rues y compris revêtement ou décapage (1631)",
              LabelEn: "Highway, Street, Road including Paving, Resurfacing (1631)"
            },
            showOrder: 0
          },
          {
            id: 12602,
            responseKey: "80",
            label: {
              LabelFr: "Plomberie, y compris spa (1711)",
              LabelEn: "Plumbing, Including Hot Tubs (1711)"
            },
            showOrder: 0
          },
          {
            id: 12603,
            responseKey: "83",
            label: {
              LabelFr: "Extincteur automatique de bâtiment - (gicleurs) (1714)",
              LabelEn: "Automatic Sprinklers (1714)"
            },
            showOrder: 0
          },
          {
            id: 12604,
            responseKey: "84",
            label: {
              LabelFr: "Ventilation/Climatisation/Chauffage (HVAC) (1715)",
              LabelEn: "Heating/Ventilation/Air-Conditioning (HVAC) (1715)"
            },
            showOrder: 0
          },
          {
            id: 12605,
            responseKey: "96",
            label: {
              LabelFr: "Fondation (1741)",
              LabelEn: "Foundation (1741)"
            },
            showOrder: 0
          },
          {
            id: 12606,
            responseKey: "109",
            label: {
              LabelFr: "Recouvrement extérieur de bâtiment (1762)",
              LabelEn: "Sheet Metal - Away from Shop (1762)"
            },
            showOrder: 0
          },
          {
            id: 12607,
            responseKey: "118",
            label: {
              LabelFr: "Excavation (1774)",
              LabelEn: "Excavation (1774)"
            },
            showOrder: 0
          },
          {
            id: 12608,
            responseKey: "119",
            label: {
              LabelFr: "Toitures (bardeaux) (1775)",
              LabelEn: "Roofing - Residential (Shingle) (1775)"
            },
            showOrder: 0
          },
          {
            id: 12609,
            responseKey: "120",
            label: {
              LabelFr: "Toitures (à chaud) (1776)",
              LabelEn: "Roofing - Other (Hot Tar, etc.) (1776)"
            },
            showOrder: 0
          },
          {
            id: 12610,
            responseKey: "121",
            label: {
              LabelFr: "Travaux d'étanchéité (1777)",
              LabelEn: "Waterproofing Operations (1777)"
            },
            showOrder: 0
          },
          {
            id: 12611,
            responseKey: "126",
            label: {
              LabelFr: "Amiante, plomb, réduction UFI, atténuation des impacts du radon, décontamination des réservoirs (1782)",
              LabelEn: "Asbestos, Lead, UFI Abatement, Radon Mitigation, Tank Remediation (1782)"
            },
            showOrder: 0
          },
          {
            id: 12612,
            responseKey: "608",
            label: {
              LabelFr: "Systèmes d'alarme - Installation (mais non la réparation du matériel à éteindre les incendies) (7396)",
              LabelEn: "Alarm System - Installation (excluding repair of fire suppression equipment)(7396)"
            },
            showOrder: 0
          },
          {
            id: 12614,
            responseKey: "47",
            label: {
              LabelFr: "Travaux de soutènement ou déplacement de bâtiment (1511)",
              LabelEn: "Support work or relocation of buildings (1511)"
            },
            showOrder: 0
          },
          {
            id: 12732,
            responseKey: "927",
            label: {
              LabelFr: "Vitrerie (1535)",
              LabelEn: "Glazier Work (1535)"
            },
            showOrder: 0
          },
          {
            id: 12736,
            responseKey: "133",
            label: {
              LabelFr: "Piscines hors terre - incluant accessoires, installation, réparation, ouverture et fermeture (1831)",
              LabelEn: "Pools: above ground - including accessories, installation, repair, opening and closing (1831)"
            },
            showOrder: 0
          }
        ],
        rules: [
          {
            id: 2267,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "607",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2268,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "95",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2269,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "53",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2270,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "603",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2271,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "922",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2272,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "21",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2273,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "916",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2274,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "106",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2275,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "107",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2276,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "606",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2277,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "91",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2278,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "98",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2279,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "113",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2280,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "104",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2281,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "105",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2282,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "99",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2283,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "128",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2284,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "61",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2285,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "63",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2286,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "100",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2287,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "22",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2288,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "923",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2289,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "921",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2290,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "920",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2291,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "919",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2292,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "102",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2293,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "47",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2294,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "48",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2295,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "50",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2296,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "51",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2297,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "56",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2298,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "62",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2299,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "72",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2301,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "80",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2302,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "83",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2303,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "84",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2304,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "96",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2305,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "109",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2306,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "118",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2307,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "119",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2308,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "120",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2309,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "121",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2310,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "126",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2311,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "608",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2316,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2267,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2317,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2268,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2318,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2269,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2319,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2270,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2320,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2271,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2321,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2273,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2322,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2274,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2323,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2275,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2324,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2276,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2325,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2278,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2326,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2279,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2327,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2280,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2328,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2281,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2329,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2282,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2330,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2283,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2331,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2284,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2332,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2285,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2333,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2286,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2334,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2287,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2335,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2288,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2336,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2289,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2337,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2290,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2338,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2291,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2339,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2292,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2340,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2293,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2341,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2294,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2342,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2295,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2343,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2296,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2344,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2297,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2345,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2298,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2346,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2299,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2347,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2301,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2348,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2302,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2349,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2303,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2350,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2304,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2351,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2305,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2353,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2306,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2354,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2307,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2355,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2308,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2356,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2309,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2357,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2310,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2358,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2311,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2359,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2272,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2360,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2277,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2449,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "922",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2450,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "95",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2451,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "106",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2452,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "107",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2453,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "91",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2454,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "98",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2455,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "113",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2456,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "104",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2461,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "105",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2462,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "99",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2463,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "61",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2464,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "100",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2465,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "923",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2466,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "921",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2467,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "920",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2468,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "919",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2469,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "102",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2470,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "48",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2471,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "50",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2472,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "51",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2473,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "56",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2474,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "62",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2475,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "72",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2476,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "80",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2477,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "83",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2478,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "84",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2479,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "96",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2480,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "109",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2481,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "118",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2482,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "119",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2483,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "120",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2484,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "121",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2485,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "126",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2486,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "608",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2487,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "47",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2569,
            questionId: 2885,
            operation: "GREATER_THAN",
            action: "SEQUENCE",
            value: "80",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2457,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: true,
            identifier: "927",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2570,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "927",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2572,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2570,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2586,
            questionId: 2885,
            operation: "GREATER_EQUAL",
            action: "SET_VALUE",
            value: "80",
            destinationId: 3054,
            sourceId: 0,
            referenceId: 0,
            isSequenceEnd: true,
            forceValue: "SpecializedContractor",
            fromIdentifier: true,
            identifier: "133",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2587,
            questionId: 2885,
            operation: "COUNT_LESSER_THAN",
            action: "SEQUENCE",
            value: "3",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2586,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          }
        ],
        identifier: "",
        defaultValue: "",
        unit: {
          LabelFr: "",
          LabelEn: ""
        },
        minLength: "",
        maxLength: "",
        mask: ""
      },
      {
        id: 2880,
        title: {
          LabelFr: "Limite de responsabilité civile",
          LabelEn: "Liability Limit"
        },
        type: "SELECT",
        isRequired: true,
        responses: [
          {
            id: 131,
            responseKey: "1000000",
            label: {
              LabelFr: "1 million",
              LabelEn: "1 million"
            },
            showOrder: 0
          },
          {
            id: 132,
            responseKey: "2000000",
            label: {
              LabelFr: "2 millions",
              LabelEn: "2 million"
            },
            showOrder: 0
          },
          {
            id: 133,
            responseKey: "3000000",
            label: {
              LabelFr: "3 millions",
              LabelEn: "3 million"
            },
            showOrder: 0
          },
          {
            id: 134,
            responseKey: "4000000",
            label: {
              LabelFr: "4 millions",
              LabelEn: "4 million"
            },
            showOrder: 0
          },
          {
            id: 135,
            responseKey: "5000000",
            label: {
              LabelFr: "5 millions",
              LabelEn: "5 million"
            },
            showOrder: 0
          }
        ],
        rules: [],
        identifier: "Liability",
        defaultValue: "",
        unit: {
          LabelFr: "",
          LabelEn: ""
        },
        minLength: "",
        maxLength: "",
        mask: ""
      },
      {
        id: 2881,
        title: {
          LabelFr: "Chiffre d'affaires annuel",
          LabelEn: "Annual revenue"
        },
        type: "NUMBER",
        isRequired: true,
        responses: [],
        rules: [],
        identifier: "Revenue",
        defaultValue: "",
        unit: {
          LabelFr: "$",
          LabelEn: "$"
        },
        minLength: "",
        maxLength: "10000000",
        mask: ""
      },
      {
        id: 2882,
        title: {
          LabelFr: "Années d'expérience continue dans ce type d’activité",
          LabelEn: "Number of years of experience"
        },
        type: "NUMBER",
        isRequired: true,
        responses: [],
        rules: [],
        identifier: "YExperience",
        defaultValue: "",
        unit: {
          LabelFr: "année(s)",
          LabelEn: "year(s)"
        },
        minLength: "",
        maxLength: "99",
        mask: ""
      },
      {
        id: 2883,
        title: {
          LabelFr: "Années en affaires",
          LabelEn: "Number of years in business"
        },
        type: "NUMBER",
        isRequired: true,
        responses: [],
        rules: [
          {
            id: 2379,
            questionId: 2883,
            operation: "GREATER_EQUAL",
            action: "SEQUENCE",
            value: "5",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2382,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2386,
            questionId: 2883,
            operation: "GREATER_EQUAL",
            action: "SEQUENCE",
            value: "5",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2384,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2387,
            questionId: 2883,
            operation: "LESSER_THAN",
            action: "SEQUENCE",
            value: "5",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2383,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          },
          {
            id: 2388,
            questionId: 2883,
            operation: "LESSER_THAN",
            action: "SEQUENCE",
            value: "5",
            destinationId: 0,
            sourceId: 0,
            referenceId: 2385,
            isSequenceEnd: false,
            forceValue: "",
            fromIdentifier: false,
            identifier: "",
            isIdentifierGrouped: false,
            isSplittable: false
          }
        ],
        identifier: "YBusiness",
        defaultValue: "",
        unit: {
          LabelFr: "année(s)",
          LabelEn: "year(s)"
        },
        minLength: "",
        maxLength: "99",
        mask: ""
      }
    ]
  }

  constructor(private http: HttpClient) { }

  // getFlashquote(marketId: string): Observable<FlashFormDTO> {
  //   return this.http.get<any>(`http://localhost:51668/api/publicflash/` + marketId);
  // }


  getFlashquote(): Observable<any> {
    return new Observable(subscriber => {
      console.log('dodo', this.dataJSON)
      subscriber.next(this.dataJSON)
    })
  }


  submitQuote(quote: any) {
    console.log('quote', quote)
    // return this.http.post<any>('http://localhost:51668/api/publicflash/', JSON.stringify(quote), {
    //   headers: { 'Content-Type': 'application/json' }
    // });
  }
}