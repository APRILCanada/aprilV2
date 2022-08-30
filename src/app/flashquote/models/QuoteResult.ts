import { SectionResult } from './SectionResult';
import { RiskResult } from './RiskResult';

export class QuoteResult{
    public riskResults: RiskResult[];
    public fee: SectionResult;
    public total:SectionResult; 
}