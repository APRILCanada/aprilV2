import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Article } from '../../../models/Article';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {
  id: string;
  article: Article = new Article();

  constructor(
    private hrService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    public language: LanguageService,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    // getIdfromUrl
    this.id = this.route.snapshot.params['id'];
    this.hrService.getArticle(this.id).subscribe((article) => {
      this.article = article || new Article();
      this.loader.loading(false);
    });
  }

  onDelete() {
    this.hrService.deleteArticle(this.article);
    this.router.navigate(['/interface/articles']);
  }
}
