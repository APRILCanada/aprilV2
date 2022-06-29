
export class Partner {
    broker?: string;
    certificateNumber?: string;
    address?: {
        unit?: string,
        number?: number;
        street?: string;
        city?: string;
        province?: string;
        postalCode?: string;
        phone?: string;
    }
    email?: string;
    billingContact?: string;
    file?: File;
    insurer?: string;
    policyNumber?: string;
    limit?: string;
    newsLetter? : boolean;
}
