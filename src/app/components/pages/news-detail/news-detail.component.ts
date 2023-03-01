import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateService } from 'src/app/services/date.service';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Article } from '../../firebase/models/Article';
import { ArticleService } from '../../firebase/services/article.service';

declare global {
  interface Window {
    dataLayer: any;
  }
}

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit {
  searchValue: string;
  article: any;
  articles: Article[];
  tagList: any[];
  frTag: any;
  id: string;
  colorArray: string[] = [
    '#639e30',
    '#d7488f',
    '#3eaac4',
    '#f7aa36',
    '#004161',
  ];

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    public language: LanguageService,
    public date: DateService,
    public loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.tagList = this.articleService.createTagList();


    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
      this.article = this.articles.find((x) => x.id == this.id);
      this.frTag = this.tagList.find((x) => x.id == this.article.tags[0]);
      this.pushGTM();
    
    });
  }

  pushGTM() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageLoad',
      'page.language': this.language.get(),
      'page.type': 'Actualités détails',
      'niche.type': '',
      'product.type': '',
      'filter.type': this.frTag.name,
    });
    // console.log(window.dataLayer);
    window['google_tag_manager' as any]['GTM-K5FLFQ' as any]?.dataLayer.reset();
  }

  searchSubmit(e: any) {
    console.log(e);
  }
}
