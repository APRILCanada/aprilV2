import { Label } from './Label';
import { Result } from './Result';

export class SectionResult{
    //public Identifier:string;
    public title:Label;
    // public TitleFr:string;
    // public TitleEn:string;
    public premium:string;
    public results: Result[]; 
}