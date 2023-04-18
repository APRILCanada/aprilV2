import { Label } from "./label";

export class Broker {
  id?: string;
  aprilonId: string;
  isActive: string;
  content: {
    USP: Label[];
    headline: Label;
  };
  email?: string;
  logo?: string;
  marketId?: string;
  name?: string;
  phone?: string;
  openingHours: Label [];
  styles?: {
    buttons?: {
      nav?:{
        ['background-color']?: string;
        border?: string;
        ['border-radius']?: string;
        color?: string;
      };
      outlined?:{
        ['background-color']?: string;
        border?: string;
        color?: string;
      };
      phone?:{
        ['background-color']?: string;
        color?: string;
      }
    };
    chips?:{
      ['background-color']?: string;
      border?: string;
      color?: string;
    };
    hero?:{
      ['background-color']?: string;
      color?: string;
      eligibilityLink?: {
        color?: string;
        }
      image?: string;
    }
    prime?: {
      ['background-color']?: string;
      color?: string;
      header?: {
        color?: string;
      };
      highlightedText?: {
        color?: string;
      };
      text?: {
        color?: string;
      };
    };
    shared?:{
      sectionHeaders?: {
        color?: string;
      };
      stepper?: {
        ['background-color']?: string;
        border?: string;
      }
    }
  }
}
  