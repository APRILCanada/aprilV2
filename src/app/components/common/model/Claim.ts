export class Claim {
  policyNumber?: string;
  insured?: string;
  company?: string;
  certificateNumber?: string;
  phoneNumber?: string;
  email?: string;
  date?: {
    year?: number;
    month?: number;
    day?: number;
  };
  province?: string;
  contractType?: string;
  reason?: string;
}
