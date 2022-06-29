import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../components/firebase/models/Article';

@Pipe({
  name: 'articlesFilter',
})
export class ArticlesListFilterPipe implements PipeTransform {
  transform(Articles: Article[], articleTag: string[]): Article[] {
    if (!Articles || !articleTag) {
      return Articles;
    }

    let checker = (arr: any[], target: any) => target.every((v: any) => arr.includes(v));
    return Articles.filter((art) => checker(art.tags, articleTag));
  }
}
