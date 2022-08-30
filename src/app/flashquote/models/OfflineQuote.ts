import { Label } from "./Label";

export class OfflineQuote {
    GUID: string;
    customerName: string;
    email: string;
    province: string;
    risk: Label;
    message: string;

    constructor(guid: string = "", value: any = null) {
        this.GUID = guid;
        this.customerName = value["customerName"] || "";
        this.email = value["email"] || "";
        this.province = value["province"] || "";
        this.risk = value["risk"] == null ? new Label("Inconnu", "Unknown") : new Label(value["risk"].label.LabelFr, value["risk"].label.LabelEn);
        this.message = value["message"] || "";
    }
}