import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../../services/article.service'
import { Article } from '../../../models/Article';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { Paragraph } from '../../../models/Paragraph';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent implements OnInit {

  articleForm : FormGroup = this.articleService.createArticleForm();
  id: string;
  article: Article =  new Article();
  tags: IMultiSelectOption[];
  
  constructor(private articleService: ArticleService, 
    private router: Router, 
    private route: ActivatedRoute, 
    public language: LanguageService,
    ) {}
  
    public get paragraphsFormArrayFr(){
      return (this.articleForm.get("fr.paragraphs") as FormArray).controls || [];
    }
    public get paragraphsFormArrayEn(){
      return (this.articleForm.get("en.paragraphs") as FormArray).controls || [];
    }

  ngOnInit(): void { 

    
    // getIdfromUrl
    this.id = this.route.snapshot.params['id'];
    this.articleService.getArticle(this.id).subscribe(article => {
      this.article = article;     
      let arrayFr = this.articleForm.get("fr.paragraphs") as FormArray;
      let arrayEn = this.articleForm.get("en.paragraphs") as FormArray;
      arrayFr.controls = [];
      arrayEn.controls = [];
      
     for(let paragraph of this.article.fr.paragraphs){
        arrayFr.controls.push(new FormGroup({
          "order":new FormControl(paragraph.order),
          "title":new FormControl(paragraph.title),
          "desc":new FormControl(paragraph.desc)
        }));
      }

      for(let paragraph of this.article.en.paragraphs){
        arrayEn.controls.push(new FormGroup({
          "order":new FormControl(paragraph.order),
          "title":new FormControl(paragraph.title),
          "desc":new FormControl(paragraph.desc)
        }));
      }
      this.tags = this.articleService.createTagList();
      this.articleForm.patchValue(this.article);
      this.articleForm.updateValueAndValidity();
    });
    
  };

  addParagraphFr(){
    var arrayFr = ((this.articleForm.controls["fr"] as FormGroup).controls["paragraphs"] as FormArray).controls;
    arrayFr.push(new FormGroup({
      "order":new FormControl(arrayFr.length + 1),
      "title":new FormControl(""),
      "desc":new FormControl("")
    }));


    var array2 = this.article.fr.paragraphs;
    array2?.push({
      order: array2.length,
      title:"",
      desc:""
    })

  }
  
  addParagraphEn(){
    var arrayEn = ((this.articleForm.controls["en"] as FormGroup).controls["paragraphs"] as FormArray).controls;
    arrayEn.push(new FormGroup({
      "order":new FormControl(arrayEn.length + 1),
      "title":new FormControl(""),
      "desc":new FormControl("")
    }));

    var array2 = this.article.en.paragraphs;
    array2?.push({
      order: array2.length,
      title:"",
      desc:""
    })

    
  }
  
  onSubmit() {
    this.article.isActive = this.articleForm.value.isActive || this.article.isActive;
    this.article.isFeatured = this.articleForm.value.isFeatured || this.article.isFeatured;
    this.article.mainImg = this.articleForm.value.mainImg || this.article.mainImg;
    this.article.smallImg = this.articleForm.value.smallImg || this.article.smallImg;
    this.article.tags = this.articleForm.value.tags || this.article.tags;
    this.article.fr.title = this.articleForm.value.fr.title || this.article.fr.title;
    this.article.fr.brief = this.articleForm.value.fr.brief || this.article.fr.brief;
    this.article.fr.mainImgAlt = this.articleForm.value.fr.mainImgAlt || this.article.fr.mainImgAlt;
    this.article.fr.smallImgAlt = this.articleForm.value.fr.smallImgAlt || this.article.fr.smallImgAlt;
    this.article.en.title = this.articleForm.value.en.title || this.article.en.title;
    this.article.en.brief = this.articleForm.value.en.brief || this.article.en.brief;
    this.article.en.mainImgAlt = this.articleForm.value.en.mainImgAlt || this.article.en.mainImgAlt;
    this.article.en.smallImgAlt = this.articleForm.value.en.smallImgAlt || this.article.en.smallImgAlt;

    for(let i:number = 0; i < this.paragraphsFormArrayEn.length; i++){
      this.article.fr.paragraphs[i].order = (this.paragraphsFormArrayFr[i] as FormGroup).value.order || this.article.fr.paragraphs[i].order;
      this.article.fr.paragraphs[i].title = (this.paragraphsFormArrayFr[i] as FormGroup).value.title || this.article.fr.paragraphs[i].title;
      this.article.fr.paragraphs[i].desc = (this.paragraphsFormArrayFr[i] as FormGroup).value.desc || this.article.fr.paragraphs[i].desc;
    }
    for(let i:number = 0; i < this.paragraphsFormArrayFr.length; i++){
      this.article.en.paragraphs[i].order = (this.paragraphsFormArrayEn[i] as FormGroup).value.order ||this.article.en.paragraphs[i].order;
      this.article.en.paragraphs[i].title = (this.paragraphsFormArrayEn[i] as FormGroup).value.title ||this.article.en.paragraphs[i].title;
      this.article.en.paragraphs[i].desc = (this.paragraphsFormArrayEn[i] as FormGroup).value.desc ||this.article.en.paragraphs[i].desc;
    }
      this.articleForm.updateValueAndValidity();
   
    this.articleService.updateArticle(this.article);
    this.router.navigate(['/interface/articles/details/'+ this.article.id])
    // popup thank you
  }
}
