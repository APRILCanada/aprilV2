import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/Article';
import { LanguageService } from 'src/app/services/language.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  articleForm: any;
  sectionIntro: boolean = true;
  sectionFr: boolean = false;
  sectionEn: boolean = false;
  progress: number = 0;
  introCompleted: boolean = true;
  frCompleted: boolean = false;
  enCompleted: boolean = false;
  article: Article = new Article();
  optionsModel: number[];
  tags: IMultiSelectOption[];

  constructor(
    private articleService: ArticleService,
    public language: LanguageService,
    private router: Router,
    private modalService: NgbModal,
    private loader: LoadingService
  ) {}

  ngOnInit() {
    this.articleForm = this.articleService.createArticleForm();

    this.tags = this.articleService.createTagList();
    this.loader.loading(false);
  }

  openModal(content:any) {
    this.modalService.open(content, { size: 'lg' });
  }

  completeIntro() {
    this.frCompleted = false;
    this.enCompleted = false;
    this.progress = 0;
    this.sectionIntro = true;
    this.sectionFr = false;
    this.sectionEn = false;
  }

  completeFr() {
    this.frCompleted = true;
    this.enCompleted = false;
    this.progress = 50;
    this.sectionIntro = false;
    this.sectionFr = true;
    this.sectionEn = false;
  }

  completeEn() {
    this.enCompleted = true;
    this.progress = 100;
    this.sectionIntro = false;
    this.sectionFr = false;
    this.sectionEn = true;
  }

  previous() {
    if (this.sectionFr == true) {
      this.sectionFr = false;
      this.sectionIntro = true;
      this.frCompleted = false;
      this.progress = 0;
    } else if (this.sectionEn == true) {
      this.sectionEn = false;
      this.sectionFr = true;
      this.enCompleted = false;
      this.progress = 50;
    }
  }

  next() {
    //  popup if error
    if (this.sectionIntro == true) {
      this.sectionIntro = false;
      this.sectionFr = true;
      this.frCompleted = true;
      this.progress = 50;
    } else if (this.sectionFr == true) {
      this.sectionFr = false;
      this.sectionEn = true;
      this.enCompleted = true;
      this.progress = 100;
    }
  }

  onSubmit() {
    this.article = this.articleForm.value;
    this.articleService.createArticle(this.article.id, this.article);
    this.articleForm.reset();
    this.router.navigate(['/interface/articles']);
  }

  send() {
    this.onSubmit();
    this.modalService.dismissAll();
  }

  addParagraphFr() {
    var array = (this.articleForm.controls['fr'] as FormGroup).controls[
      'paragraphs'
    ] as FormArray;
    array.push(
      new FormGroup({
        order: new FormControl(array.length + 1),
        title: new FormControl(''),
        desc: new FormControl(''),
      })
    );
  }

  addParagraphEn() {
    var array = (this.articleForm.controls['en'] as FormGroup).controls[
      'paragraphs'
    ] as FormArray;
    array.push(
      new FormGroup({
        order: new FormControl(array.length + 1),
        title: new FormControl(''),
        desc: new FormControl(''),
      })
    );
  }
}
