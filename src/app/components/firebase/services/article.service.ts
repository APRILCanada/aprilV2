import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/Article';
import { map } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articlesCollection: AngularFirestoreCollection<Article>;
  articleDoc: AngularFirestoreDocument<Article>;
  articles: Observable<Article[]>;
  article: any;
  colorArray: string[] = [
    '#639e30',
    '#d7488f',
    '#3eaac4',
    '#f7aa36',
    '#004161',
  ];

  constructor(private afs: AngularFirestore) {
    this.articlesCollection = afs.collection<Article>('articles');
    this.articles = this.articlesCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a: any) => {
          const data = a.payload.doc.data() as Article;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getArticles(): Observable<Article[]> {
    return this.articles;
  }

  createArticle(id: any, article: Article) {
    this.articlesCollection.doc(id).set(article);
  }

  createTagList() {
    return [
      {
        id: 'INFORMATION',
        name: 'Information',
        color: this.colorArray[0 % this.colorArray.length],
        isActive: false,
      },
      {
        id: 'ACTUALITY',
        name: 'Actualité',
        color: this.colorArray[1 % this.colorArray.length],
        isActive: false,
      },
      {
        id: 'PERSONAL',
        name: 'Lignes personnelles ',
        color: this.colorArray[2 % this.colorArray.length],
        isActive: false,
      },
      {
        id: 'COMMERCIAL',
        name: 'Commercial',
        color: this.colorArray[3 % this.colorArray.length],
        isActive: false,
      },
      {
        id: 'REAL_ESTATE',
        name: 'Immobilier',
        color: this.colorArray[4 % this.colorArray.length],
        isActive: false,
      },
      {
        id: 'CYBER',
        name: 'Cyber',
        color: this.colorArray[5 % this.colorArray.length],
        isActive: false,
      },
      {
        id: 'PROFESSIONAL',
        name: 'Professionel',
        color: this.colorArray[6 % this.colorArray.length],
        isActive: false,
      },
      {
        id: 'RESIDENTIAL',
        name: 'Résidentiel',
        color: this.colorArray[7 % this.colorArray.length],
        isActive: false,
      },
      {
        id: 'COMMERCIAL_MARINE',
        name: 'Marine commerciale',
        color: this.colorArray[8 % this.colorArray.length],
        isActive: false,
      },
      {
        id: 'OTHER_COMMERCIAL',
        name: 'Autres commerciales',
        color: this.colorArray[9 % this.colorArray.length],
        isActive: false,
      },
      {
        id: 'COMMERCIAL_AUTOMOBILE',
        name: 'Automobile commerciale',
        color: this.colorArray[10 % this.colorArray.length],
        isActive: false,
      },
    ];
  }

  createArticleForm() {
    return new FormGroup({
      isActive: new FormControl(''),
      isFeatured: new FormControl(null),
      id: new FormControl(null),
      mainImg: new FormControl(null),
      smallImg: new FormControl(null),
      date: new FormControl(null),
      tags: new FormControl(null),
      fr: new FormGroup({
        title: new FormControl(null),
        brief: new FormControl(null),
        mainImgAlt: new FormControl(null),
        smallImgAlt: new FormControl(null),
        paragraphs: new FormArray([
          new FormGroup({
            order: new FormControl(1),
            title: new FormControl(''),
            desc: new FormControl(''),
          }),
        ]),
      }),
      en: new FormGroup({
        title: new FormControl(null),
        brief: new FormControl(null),
        mainImgAlt: new FormControl(null),
        smallImgAlt: new FormControl(null),
        paragraphs: new FormArray([
          new FormGroup({
            order: new FormControl(1),
            title: new FormControl(''),
            desc: new FormControl(''),
          }),
        ]),
      }),
    });
  }

  createDeclaration() {
    return {
      id: '',
      isActive: '',
      isFeatured: '',
      mainImg: '',
      smallImg: '',
      tags: [],
      date: {
        year: 0,
        month: 0,
        day: 0,
      },
      fr: {
        title: '',
        brief: '',
        mainImgAlt: '',
        smallImgAlt: '',
        paragraphs: [],
      },
      en: {
        title: '',
        brief: '',
        mainImgAlt: '',
        smallImgAlt: '',
        paragraphs: [],
      },
    };
  }

  getArticle(id: string): Observable<Article> {
    this.articleDoc = this.afs.doc<Article>(`articles/${id}`);
    this.article = this.articleDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Article;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.article;
  }

  updateArticle(article: Article) {
    this.articleDoc = this.afs.doc(`articles/${article.id}`);
    this.articleDoc.update(article);
  }

  deleteArticle(article: Article) {
    this.articleDoc = this.afs.doc(`articles/${article.id}`);
    this.articleDoc.delete();
  }
}
