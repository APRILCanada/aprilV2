import { Label } from './Label';
import { Section } from './Section';

export class Form {
    id: number;
    // name:string;
    sections: Section[] = new Array<Section>();
    declaration: Label;
    // DeclarationFr:string;
    // DeclarationEn:string;
    // IsCommissionDependant:boolean;
    // MinCommission:number;
    // MaxCommission:number;
    // StepCommission:number;
    defaultCommission: number;
}