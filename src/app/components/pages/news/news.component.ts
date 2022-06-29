import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesListFilterPipe } from 'src/app/pipes/articles-list-filter.pipe';
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
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [ArticlesListFilterPipe],
})
export class NewsComponent
  implements OnInit, AfterViewChecked, AfterContentInit
{
  @ViewChild('articleGrid') articleGrid: ElementRef;
  @ViewChildren('featuredContainer') featuredContainer: QueryList<ElementRef>;

  page: number = parseInt(localStorage.getItem('page')!);
  id: string;
  article: Article = new Article();
  articles: any[];
  featuredArticle: Article;
  filteredArticles: Article[] = [];
  filteredTags: any[] = [];
  articleList: any[] = [];
  tagList: any[];
  tagHoverArray: boolean[] = [];
  tagActiveArray: boolean[] = [];
  colorArray: string[] = [
    '#639e30',
    '#d7488f',
    '#3eaac4',
    '#f7aa36',
    '#004161',
  ];
  totalLength: number;
  featuredHeight: number = 0;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    public language: LanguageService,
    private articlesListFilter: ArticlesListFilterPipe,
    public date: DateService,
    public loader: LoadingService
  ) {}

  ngOnInit(): void {
    // getIdfromUrl
    this.id = this.route.snapshot.params['id'] || '';
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
      this.article = this.articles.find((x) => x.id == this.id);
      this.featuredArticle = this.articles.find(
        (x) => x.isFeatured == 'isFeatured'
      );
      this.filteredArticles = this.articles.filter(
        (x) => x.isFeatured == 'notFeatured'
      );
      this.totalLength = this.filteredArticles.length;
    });
    this.tagList = this.articleService.createTagList();
    this.tagList.forEach(() => {
      this.tagHoverArray.push(false);
    });
  }

  ngAfterViewChecked() {
    this.featuredContainer.forEach((element) => {
      this.featuredHeight = element.nativeElement?.offsetHeight;
    });
  }

  ngAfterContentInit() {
    if (this.router.url === '/actualites') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'pageLoad',
        'page.language': this.language.get(),
        'page.type': 'Actualité',
        'niche.type': '',
        'product.type': '',
        'filter.type': '',
      });
      // console.log(window.dataLayer);
    }
  }

  getPlusUrl(i: any) {
    if (this.tagHoverArray[i] || this.tagList[i].isActive) {
      let url = "url('../../../../assets/img/icons/close-white.svg')";
      return url;
    } else {
      let url = "url('../../../../assets/img/icons/close-" + (i % 5) + ".svg')";
      return url;
    }
  }

  toggleFilters(i: any) {
    this.tagList[i].isActive = !this.tagList[i].isActive;
    this.filteredTags = this.tagList.filter((tag) => tag.isActive == true);
    this.filteredArticles = this.articlesListFilter.transform(
      this.articles,
      this.filteredTags.map((x) => x.id)
    );
    this.totalLength = this.filteredArticles.length;
    this.page = 1;
    // console.log(this.filteredTags.map(f => f.id.toLowerCase()))

    window.dataLayer.push({
      event: 'pageLoad',
      'page.language': this.language.get(),
      'page.type': 'Actualité',
      'niche.type': '',
      'product.type': '',
      'filter.type': this.filteredTags.map((f) => f.name.toLowerCase()),
    });
    window['google_tag_manager' as any]['GTM-K5FLFQ' as any].dataLayer.reset();
    // console.log(window.dataLayer)
  }

  scrollToArticleGrid() {
    this.articleGrid.nativeElement.scrollIntoView();
    localStorage.setItem('page', this.page.toString());
  }
}
