export class Label {
  LabelFr: string;
  LabelEn: string;

  constructor(labelFr: string, labelEn: string = '') {
    if (labelEn == '') labelEn = labelFr;
    this.LabelFr = labelFr;
    this.LabelEn = labelEn;
  }
}
