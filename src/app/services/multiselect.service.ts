import { Injectable } from '@angular/core';
import {
  IMultiSelectOption,
  IMultiSelectTexts,
  IMultiSelectSettings,
} from 'ngx-bootstrap-multiselect';

@Injectable({
  providedIn: 'root',
})
export class MultiselectService {
  // Options
  provEn: IMultiSelectOption[] = [
    { id: 'BC', name: 'British Columbia' },
    { id: 'AB', name: 'Alberta' },
    { id: 'MB', name: 'Manitoba' },
    { id: 'SK', name: 'Saskatchewan' },
    { id: 'ON', name: 'Ontario' },
    { id: 'QC', name: 'Quebec' },
    { id: 'NB', name: 'New Brunswick' },
    { id: 'NS', name: 'Nova Scotia' },
    { id: 'NL', name: 'Newfound Land' },
    { id: 'PEI', name: 'Prince Edward Island' },
  ];
  provFr: IMultiSelectOption[] = [
    { id: 'BC', name: 'Colombie Britannique' },
    { id: 'AB', name: 'Alberta' },
    { id: 'MB', name: 'Manitoba' },
    { id: 'SK', name: 'Saskatchewan' },
    { id: 'ON', name: 'Ontario' },
    { id: 'QC', name: 'Québec' },
    { id: 'NB', name: 'Nouveau Brunswick' },
    { id: 'NS', name: 'Nouvelle-Écosse' },
    { id: 'NL', name: 'Terre-Neuve' },
    { id: 'PEI', name: 'Île du Prince-Édouard' },
  ];
  activityEn: IMultiSelectOption[] = [
    {
      id: '1752a',
      name: 'Carpentry outside workshop: kitchen cabinet, staircase, balcony and other prefabricated wooden products (1752a)',
    },
    {
      id: '1736',
      name: 'Electrician: commercial, industrial, institutional sectors (1736)',
    },
    {
      id: '1522',
      name: 'Fence: installation and repair - excluding manufacturing (1522)',
    },
    {
      id: '7391',
      name: 'Fumigation, exterminating operations inside buildings or vessels (7391)',
    },
    {
      id: '7395',
      name: "Furniture, drapery, dug cleaning on customer's premises (7395)",
    },
    { id: '735', name: 'Landscaping: gardener and landscaper (735)' },
    {
      id: '1812',
      name: 'General contractor: residential and other business sectors (1812)',
    },
    { id: '1756', name: 'Floor covering: wood, carpet, vinyl (1756)' },
    { id: '1757', name: 'Interior decorator (1757)' },
    { id: '7394', name: 'Janitorial service (7394)' },
    {
      id: '1731',
      name: 'Electrician: residential and commercial sectors (1731)',
    },
    {
      id: '1743',
      name: 'Masonry: bricklaying, stonework, tile, marble, mosaic, stuccoing (1743)',
    },
    {
      id: '1766',
      name: 'Installation of door, garage door, window, metal awning (1766)',
    },
    {
      id: '1754',
      name: 'Painting and decorating - excluding spray paint (1754)',
    },
    {
      id: '1755',
      name: 'Painting and decorating - including spray paint (1755)',
    },
    {
      id: '1744',
      name: 'Interior system, gypsum installation, drywall, plastering and battening (1744)',
    },
    {
      id: '1811',
      name: 'General contractor: residential up to eight dwellings and commercial for retail stores (1811)',
    },
    { id: '1532', name: 'Signs - without electrical circuits (1532)' },
    { id: '1534', name: 'Television antennae (1534)' },
    {
      id: '1745',
      name: 'Tilework - excluding masonry, sewers, drains, ceiling, terrazzo (1745)',
    },
    { id: '736', name: 'Tree removal, trimming, pruning (736)' },
    {
      id: '1532a',
      name: 'Signs - with electrical circuits - excluding manufacturing (1532a)',
    },
    {
      id: '1743a',
      name: 'Installation (a) of exterior building covering: vinyl, aluminum, steel  - except masonry (1743a)',
    },
    { id: '1743b', name: 'Installation (b) of gutter (1743b)' },
    {
      id: '1743c',
      name: 'Installation (c) of sealer for doors and windows (1743c)',
    },
    {
      id: '1752',
      name: 'Carpentry outside workshop: wooden building structure (1752)',
    },
    {
      id: '1511',
      name: 'Support work or relocation of buildings (1511)',
    },
    {
      id: '1512',
      name: 'Demolition (load-bearing wall or complete building) (1512)',
    },
    {
      id: '1514',
      name: 'Support work, underpinning operations, caisson work, pile driving (1514)',
    },
    { id: '1515', name: 'Blasting Contractors (1515)' },
    { id: '1525', name: 'Snow Removal, Clearing, Ploughing (1525)' },
    { id: '1533', name: 'Removal or installation of tank (1533)' },
    {
      id: '1631',
      name: 'Highway, Street, Road including Paving, Resurfacing (1631)',
    },
    { id: '1711', name: 'Plumbing, Including Hot Tubs (1711)' },
    {
      id: '1714',
      name: 'Automatic Sprinklers (1714)',
    },
    { id: '1715', name: 'Heating/Ventilation/Air-Conditioning (HVAC) (1715)' },
    { id: '1741', name: 'Foundation (1741)' },
    { id: '1762', name: 'Sheet Metal - Away from Shop (1762)' },
    { id: '1774', name: 'Excavation (1774)' },
    { id: '1775', name: 'Roofing - Residential (Shingle) (1775)' },
    { id: '1776', name: 'Roofing - Other (Hot Tar, etc.) (1776)' },
    { id: '1777', name: 'Waterproofing Operations (1777)' },
    {
      id: '1782',
      name: 'Asbestos, Lead, UFI Abatement, Radon Mitigation, Tank Remediation (1782)',
    },
    {
      id: '7396',
      name: 'Alarm System - Installation (excluding repair of fire suppression equipment)(7396)',
    },
  ];
  activityFr: IMultiSelectOption[] = [
    {
      id: '1752a',
      name: 'Menuiserie hors atelier : armoire de cuisine, escalier, balcon et autres produits préfabriqués en bois  (1752a)',
    },
    {
      id: '1736',
      name: 'Électricien : secteurs commercial, industriel, institutionnel (1736)',
    },
    {
      id: '1522',
      name: 'Clôture : installation et réparation - excluant fabrication (1522)',
    },
    {
      id: '7391',
      name: "Fumigation, désinsectisation, dératisation à l'intérieur des bâtiments ou bateaux (7391)",
    },
    {
      id: '7395',
      name: 'Nettoyage de meubles, tentures, moquettes chez les clients (7395)',
    },
    { id: '735', name: 'Aménagement paysager : jardinier et paysagiste (735)' },
    {
      id: '1812',
      name: 'Entrepreneur général : résidentiel et autres secteurs d’activité (1812)',
    },
    { id: '1756', name: 'Recouvrement de sol : bois, tapis, vinyle (1756)' },
    { id: '1757', name: "Décorateur d'intérieur (1757)" },
    { id: '7394', name: 'Concierge (7394)' },
    {
      id: '1731',
      name: 'Électricien : secteurs résidentiel et commercial (1731)',
    },
    {
      id: '1743',
      name: 'Maçonnerie : brique, pierre, carrelage, marbre, mosaïque, stuc (1743)',
    },
    {
      id: '1766',
      name: 'Installation de porte, porte de garage, fenêtre, auvent métallique (1766)',
    },
    {
      id: '1754',
      name: 'Peinture et décoration - sans emploi de pistolets (1754)',
    },
    {
      id: '1755',
      name: 'Peinture et décoration - avec emploi de pistolets (1755)',
    },
    {
      id: '1744',
      name: 'Système d’intérieur, pose de gypse, cloison sèche, plâtrage et lattage (1744)',
    },
    {
      id: '1811',
      name: 'Entrepreneur général : résidentiel jusqu’à huit logis et commercial en commerce de détail (1811)',
    },
    { id: '1532', name: 'Enseignes - sans circuits électriques (1532)' },
    { id: '1534', name: 'Antennes de télévision (1534)' },
    {
      id: '1745',
      name: 'Pose de carrelage, céramique, mosaïque - excluant maçonnerie, égout, évacuation, plafond, terrazzo (1745)',
    },
    { id: '736', name: 'Arbres : enlèvement, taille, élagage (736)' },
    {
      id: '1532a',
      name: 'Enseignes - avec circuits électriques - excluant la fabrication (1532a)',
    },
    {
      id: '1743a',
      name: 'Installation (a) de recouvrement extérieur de bâtiment : vinyle, aluminium, acier - sauf maçonnerie (1743a)',
    },
    { id: '1743b', name: 'Installation (b) de gouttière (1743b)' },
    {
      id: '1743c',
      name: 'Installation (c) de scellant pour portes et fenêtres (1743c)',
    },
    {
      id: '1752',
      name: 'Charpenterie hors atelier : structure de bâtiment en bois (1752)',
    },
    {
      id: '1511',
      name: 'Travaux de soutènement ou déplacement de bâtiment (1511)',
    },
    { id: '1512', name: 'Démolition (mur porteur ou bâtiment complet) (1512)' },
    {
      id: '1514',
      name: 'Soutènement/étaiement, reprise en sous-oeuvre, travaux en caisson, battage de pieux (1514)',
    },
    { id: '1515', name: "Utilisation d'explosifs (1515)" },
    { id: '1525', name: 'Déneigement (1525)' },
    { id: '1533', name: 'Enlèvement/installation de reservoir (1533)' },
    {
      id: '1631',
      name: 'Routes, rues y compris revêtement ou décapage (1631)',
    },
    { id: '1711', name: 'Plomberie, y compris spa (1711)' },
    {
      id: '1714',
      name: 'Extincteur automatique de bâtiment - (gicleurs) (1714)',
    },
    { id: '1715', name: 'Ventilation/Climatisation/Chauffage (HVAC) (1715)' },
    { id: '1741', name: 'Fondation (1741)' },
    { id: '1762', name: 'Recouvrement extérieur de bâtiment (1762)' },
    { id: '1774', name: 'Excavation (1774)' },
    { id: '1775', name: 'Toitures (bardeaux) (1775)' },
    { id: '1776', name: 'Toitures (à chaud) (1776)' },
    { id: '1777', name: "Travaux d'étanchéité (1777)" },
    {
      id: '1782',
      name: 'Amiante, plomb, réduction UFI, atténuation des impacts du radon, décontamination des réservoirs (1782)',
    },
    {
      id: '7396',
      name: "Systèmes d'alarme - Installation (mais non la réparation du matériel à éteindre les incendies) (7396)",
    },
  ];

  riskEn: IMultiSelectOption[] = [
    { id: 'commercial-and-business', name: 'Commercial and Business' },
    { id: 'residential', name: 'Residential' },
    { id: 'trucking-and-towing', name: 'Trucking and Towing' },
    { id: 'commercial-marine', name: 'Commercial Marine' },
    { id: 'automobile', name: 'Automobile' },
    {
      id: 'other-commercial',
      name: 'Other Commercial & Business Insurance and Add-ons',
    },
  ];
  riskFr: IMultiSelectOption[] = [
    { id: 'commercial-and-business', name: 'Entreprise' },
    { id: 'residential', name: 'Résidentiel' },
    { id: 'trucking-and-towing', name: 'Cammionage et remorquage' },
    { id: 'commercial-marine', name: 'Marine commerciale' },
    { id: 'automobile', name: 'Automobile' },
    { id: 'other-commercial', name: 'Autres formulaires commerciales' },
  ];
  limitEn: IMultiSelectOption[] = [
    { id: '1M', name: '1 million' },
    { id: '2M', name: '2 million' },
    { id: '3M', name: '3 million' },
    { id: '4M', name: '4 million' },
    { id: '5M', name: '5 million' },
  ];
  limitFr: IMultiSelectOption[] = [
    { id: '1M', name: '1 million' },
    { id: '2M', name: '2 million' },
    { id: '3M', name: '3 million' },
    { id: '4M', name: '4 million' },
    { id: '5M', name: '5 million' },
  ];

  insuranceEn: IMultiSelectOption[] = [
    { id: 'commercial-and-business', name: 'Commercial and Business' },
    { id: 'residential', name: 'Residential' },
    { id: 'trucking-and-towing', name: 'Trucking and Towing' },
    { id: 'commercial-marine', name: 'Commercial Marine' },
    { id: 'automobile', name: 'Automobile' },
    { id: 'cyber', name: 'Cyber' },
    { id: 'other-commercial', name: 'Other Commercial & Business Insurance' },
  ];
  insuranceFr: IMultiSelectOption[] = [
    { id: 'commercial-and-business', name: 'Entreprise' },
    { id: 'residential', name: 'Résidentiel' },
    { id: 'trucking-and-towing', name: 'Cammionage et remorquage' },
    { id: 'commercial-marine', name: 'Marine commerciale' },
    { id: 'automobile', name: 'Automobile' },
    { id: 'cyber', name: 'Cyber' },
    { id: 'other-commercial', name: 'Autres commerciales' },
  ];

  langEn: IMultiSelectOption[] = [
    { id: 'EN', name: 'English' },
    { id: 'FR', name: 'French' },
  ];
  langFr: IMultiSelectOption[] = [
    { id: 'EN', name: 'Anglais' },
    { id: 'FR', name: 'Français' },
  ];

  // Text
  textRiskFr: IMultiSelectTexts = { defaultTitle: 'Catégorie du risque' };
  textRiskEn: IMultiSelectTexts = { defaultTitle: 'Risk category' };

  textProvFr: IMultiSelectTexts = { defaultTitle: 'Province du risque' };
  textProvEn: IMultiSelectTexts = { defaultTitle: 'Risk province' };
  textActivityFr: IMultiSelectTexts = {
    defaultTitle: ' ',
    searchPlaceholder: 'Recherchez',
  };
  textActivityEn: IMultiSelectTexts = {
    defaultTitle: ' ',
    searchPlaceholder: 'Search',
  };
  textProv: IMultiSelectTexts = { defaultTitle: 'Province' };

  // Settings
  settings: IMultiSelectSettings = {
    buttonClasses:
      'form-control d-flex text-wrap justify-content-between align-items-center drop-down-button px-4 bg-grey w-100',
    containerClasses: ' d-block',
    selectionLimit: 1,
    autoUnselect: true,
    closeOnSelect: true,
  };
  whiteSettings: IMultiSelectSettings = {
    buttonClasses:
      'form-control d-flex  justify-content-between align-items-center drop-down-button px-4 w-100',
    containerClasses: ' d-block',
    selectionLimit: 1,
    autoUnselect: true,
    closeOnSelect: true,
  };


  settingsLong: IMultiSelectSettings = {
    buttonClasses:
      'form-control d-flex text-wrap text-start justify-content-between align-items-center drop-down-button w-100 bg-grey',
    containerClasses: ' d-block',
    itemClasses: 'text-wrap',
    selectionLimit: 1,
    autoUnselect: true,
    closeOnSelect: true,
    enableSearch: true
  };

  greenSettings: IMultiSelectSettings = {
    buttonClasses:
      'form-control d-flex justify-content-between align-items-center drop-down-button px-4 w-100 green',
    containerClasses: ' d-block',
    selectionLimit: 1,
    autoUnselect: true,
    closeOnSelect: true,
  };

  constructor() { }
}
