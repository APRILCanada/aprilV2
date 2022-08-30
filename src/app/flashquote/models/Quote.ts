import { Label } from './Label';
import { QuoteFile } from './QuoteFile';
import { Form } from './form';
import { Answer } from './Answer';
import { Exclusion } from './Exclusion';

export class Quote {
    id:number;
    formId:number;
    branchId:number;
    //businessLineId:number;
    brokerId:number;
    broker:string; //could be removed
    fullName:string;
    companyName:string;
    province:string;
    // NoPolice?:number;
    statusId:number;
    effectiveDate?:Date | null ;
    referenceNumber:string;
    term:number;
    marketId:number;
    market:Label; //could be remove
    prime?:number | null;
    created?:Date | null;
    updated?:Date | null;
    referred?:boolean;
    underwriter:string; 
    underwriterExtension:string; 
    isQuotationAutomatic:boolean; 
    isOutdated:boolean; 
    isFlashQuote:boolean; 
    isSnapAvailable:boolean;
    isDeleted:boolean;

    constructor(){
        this.id = -1;
        this.formId = -1;
        this.branchId = -1;
        this.brokerId = -1;
        this.broker = "";
        this.fullName = "";
        this.companyName = "";
        this.province = "";
        // this.NoPolice = null;
        this.statusId = -1;
        this.effectiveDate = null;
        //this.term = 0;
        this.marketId = -1;
        this.market = new Label("","");
        // this.status = new Label("", "");
        this.prime = null;
        this.created = null;
        this.updated = null;
        // this.Referred = false;
        // this.Excluded = false;
        // this.ExcludedMessages = [];
        // this.ReferredMessages = [];
        // this.ReferenceNumber = 0;
        // this.IsPropoAvailable = false;
        // this.IsSummaryAvailable = false;
        // this.IsQuoteAvailable = false;
        // this.IsPolicyAvailable = false;
        // this.comment = "";
        this.underwriter = "";
        this.underwriterExtension = "";
        this.isQuotationAutomatic = false;
        this.isOutdated = false;
        this.isFlashQuote = false;
        this.isSnapAvailable = false;
        this.isDeleted = false;
    }

}

export class QuoteFormDTO {
    form: Form;
    exclusions:Exclusion[];
    files:QuoteFile[];
    answers: Answer[];
}

export class QuoteListDTO {
    id:number;
    FullName:string;
    CompanyName:string;
    Status:Label;
    StatusId:number;
    Market:Label;
    BusinessLine:Label;
    ReferenceNumber:number;
    Broker:string;
    Updated?:Date;
}