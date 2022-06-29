import { Pipe, PipeTransform } from '@angular/core';
import { Niche } from '../components/firebase/models/Niche';


@Pipe({
  name: 'nichesFilter'
})
export class NichesFilterPipe implements PipeTransform {

  transform(Niches: Niche[], nicheValue:string): Niche[] {
    if(!Niches || !nicheValue) {
      return Niches;
    }
    
    return Niches.filter(niche =>
      niche.fr.title?.toLocaleLowerCase()
    .concat(niche.en.title!.toLocaleLowerCase())
    .includes(nicheValue.toLocaleLowerCase())
    )
  }

}
