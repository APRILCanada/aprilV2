import { Label } from './Label';
import { formatCurrency } from '@angular/common';

export class Reclamation {
    date: string;
    details: string;
    amount: string;
    reserve: string;
    opened: string;

    constructor(reclamation: {
        date?: string,
        details?: string,
        amount?: string,
        reserve?: string,
        opened?: string,
    } = {}) {
        this.date = reclamation.date || '';
        this.details = reclamation.details || '';
        this.amount = reclamation.amount || '';
        this.reserve = reclamation.reserve || '';
        this.opened = reclamation.opened || '';
    }

    public toString = (): Label => {
        return this.getLabel([]);
    }

    private getBoolean(value: string): boolean {
        if (!value) {
            return false;
        }
        switch (value) {
            case "true":
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    }

    get isEmpty() {
        return this.date == "" && this.details == "" && this.amount == "" && this.reserve == "" && this.opened == "";
    }

    getLabel(details: any[]): Label {
        var detailLabel = details.find(x => x.key == this.details);
        let labelFr = `${this.date} - ${!detailLabel ? this.details : detailLabel.title.LabelFr} - ${formatCurrency(+this.amount, 'fr-CA', '$')} - ${this.getBoolean(this.opened) ? 'Ouverte' : 'Fermée'}`
        let labelEn = `${this.date} - ${!detailLabel ? this.details : detailLabel.title.LabelEn} - ${formatCurrency(+this.amount, 'fr-CA', '$')} - ${this.getBoolean(this.opened) ? 'Opened' : 'Closed'}`
        return new Label(labelFr, labelEn);
    }
}