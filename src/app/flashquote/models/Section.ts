import { Label } from './Label';
import { Question } from './Question';

export class Section {
    id:number;
    title:Label;
    isRepeat:boolean;
    questions: Question[];
    maxRepeat:number;
    showOrder: number;

    constructor(){
        this.id = -1;
        this.title = new Label("", "");
        this.isRepeat = false;
        this.questions = [];
        this.maxRepeat = 0;
        this.showOrder = 1;
    }
}