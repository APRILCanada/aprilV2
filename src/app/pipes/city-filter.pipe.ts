import { Pipe, PipeTransform } from '@angular/core';
import { Job } from '../components/firebase/models/Job';

@Pipe({
  name: 'cityFilter',
})
export class CityFilterPipe implements PipeTransform {
  transform(Jobs: Job[], city: any): Job[] {
    if (!Jobs || !city) {
      return Jobs;
    }
    return Jobs.filter((job) => job.fr.city?.includes(city));
  }
}
