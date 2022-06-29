import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Article } from '../../models/Article';
import { ArticlesFilterPipe } from 'src/app/pipes/articles-filter.pipe';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-interface-articles',
  templateUrl: './interface-articles.component.html',
  styleUrls: ['./interface-articles.component.scss'],
  providers: [ArticlesFilterPipe],
})
export class InterfaceArticlesComponent implements OnInit {
  articles: Article[];
  totalLength: number;
  page: number = 1;
  articleValue: string;
  lang: string;

  constructor(
    private articleService: ArticleService,
    public language: LanguageService,
    private translate: TranslateService,
    private router: Router,
    private articlesFilter: ArticlesFilterPipe,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = this.articlesFilter.transform(
        articles,
        this.articleValue
      );
      // this.articles = articles
      this.totalLength = this.articles.length;
      this.loader.loading(false);
    });
  }

  onSearchChange(event: Event): void {
    this.articleValue = (event.target as HTMLInputElement)?.value;
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = this.articlesFilter.transform(
        articles,
        this.articleValue
      );
      this.totalLength = this.articles.length;
      this.page = 1;
    });
  }
}
