import { Label } from './Label';

export class Tooltip{
    message:Label;
    isHTML:boolean;

    constructor(fr:string = "", en:string = "", html:boolean = false){
        this.message = new Label(fr,en);
        this.isHTML = html;
    }
}