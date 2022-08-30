import { Label } from './Label';
import { Question } from './Question';

export class FlashFormDTO {
  marketId: number;
  title: Label;
  questions: Question[];
}
