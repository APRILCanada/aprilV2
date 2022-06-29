import { Label } from './Label';

export class Rule {
  id: number;
  questionId: number;
  operation: string;
  action: string;
  value: string;
  destinationId: number;
  //SourceId:number;
  isValidation: boolean;
  message: Label;
  // MessageFr:string;
  // MessageEn:string;
  referenceId?: number;
  isFromResponseList: boolean;
  responseList: string[];
  isSequenceEnd: boolean;
  excludedReferredReasonId: number;
  forceValue: string;
  fromIdentifier: boolean;
  identifier: string;
  responseKey: number;
  isForceOnResponseList: boolean;
  isIdentifierGrouped: boolean;
  isSplittable: boolean;
}
