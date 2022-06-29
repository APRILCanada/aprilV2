import { Paragraph } from "./Paragraph";

export class ArticleContent {
		title?: string;
		brief?: string;
		mainImgAlt?: string;
		smallImgAlt?: string;
		paragraphs: Paragraph[];

		constructor(){
			this.paragraphs = [];
		}
	}
