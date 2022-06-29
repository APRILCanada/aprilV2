import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../components/firebase/models/Article';


@Pipe({
  name: 'articlesFilter'
})
export class ArticlesFilterPipe implements PipeTransform {

  transform(Articles: Article[], articleValue:string): Article[] {
    if(!Articles || !articleValue) {
      return Articles;
    }
    
    return Articles.filter(article =>
      article.fr.title?.toLocaleLowerCase()
    .concat(article.en.title!.toLocaleLowerCase())
    .includes(articleValue.toLocaleLowerCase())
    )
  }

}
