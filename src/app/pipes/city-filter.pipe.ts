import { Pipe, PipeTransform } from '@angular/core';
import { Job } from '../components/firebase/models/Job';

@Pipe({
  name: 'cityFilter',
})

export class CityFilterPipe implements PipeTransform {
  transform(jobs: any[], city: any) {
    if (!jobs || !city) {
      return jobs;
    }

    return jobs.filter((job) => job.fr.business_unit.city?.includes(city));
  }

}
