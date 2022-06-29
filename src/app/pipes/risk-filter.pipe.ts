import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'riskFilter'
})
export class RiskFilterPipe implements PipeTransform {

  transform(forms: any[], riskValue:string) {
    if(!forms || !riskValue) {
      return forms;
    }
    
    return forms.filter(form => form.riskCategory.includes(riskValue))
  }

}
