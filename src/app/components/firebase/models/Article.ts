import { ArticleContent } from "./ArticleContent";

export class Article {
	id?: string;
	isActive?: string;
	isFeatured?: string;
	mainImg?: string;
	smallImg?: string;
	tags?: any;
	date?: {
		year?: number,
		month?: number,
		day?: number,
	};
	fr:ArticleContent;
	en:ArticleContent;

	constructor(){
		this.fr = new ArticleContent();
		this.en = new ArticleContent();
	}
}
