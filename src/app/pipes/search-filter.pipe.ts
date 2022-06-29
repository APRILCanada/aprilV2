import { Pipe, PipeTransform } from '@angular/core';
import { Job } from '../components/firebase/models/Job';


@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(Jobs: Job[], searchValue: string): Job[] {
    if (!Jobs || !searchValue) {
      return Jobs;
    }

      return Jobs.filter(job => job.fr.city?.toLocaleLowerCase().concat(job.fr.title!.toLocaleLowerCase()).concat(job.en.city!.toLocaleLowerCase()).concat(job.en.title!.toLocaleLowerCase()).includes(searchValue.toLocaleLowerCase()))
  }

}
