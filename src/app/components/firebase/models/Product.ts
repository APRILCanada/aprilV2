export class Product {
  id?: string;
  parent?: string;
  isActive?: string;
  mainImg?: string;
  coverageImg?: string;
  underwritingImg?: string;
  provinces?: string;
  fr: {
    title?: string;
    desc?: string;
    target?: string;
    coverage?: string;
    underwriting?: string;
    mainImgAlt?: string;
    coverageImgAlt?: string;
    underwritingImgAlt?: string;
  };
  en: {
    title?: string;
    desc?: string;
    target?: string;
    coverage?: string;
    underwriting?: string;
    mainImgAlt?: string;
    coverageImgAlt?: string;
    underwritingImgAlt?: string;
  };
  department?: {
    titleFr?: string;
    titleEn?: string;
    extension?: string;
    email?: string;
  };
}
