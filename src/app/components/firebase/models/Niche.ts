export class Niche {
  id?: string;
  isActive?: string;
  type?: string;
  mainImg?: string;
  secondaryImg?: string;
  icon?: string;
  titleFr?: string;
  director: {
    name?: string;
    linkedIn?: string;
    email?: string;
    img?: string;
    imgAlt?: string;
  };
  fr: {
    title?: string;
    desc?: string;
    directorTitle?: string;
    directorDesc?: string;
    mainImgAlt?: string;
    secondaryImgAlt?: string;
  };
  en: {
    title?: string;
    desc?: string;
    directorTitle?: string;
    directorDesc?: string;
    mainImgAlt?: string;
    secondaryImgAlt?: string;
  };
}
