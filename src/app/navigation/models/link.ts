export class Link {
  cta!: boolean;
  dropped?: boolean;
  fr?: {
    title?: string;
    link?: string;
    dropdown?: [
      {
        title?: string;
        link?: string;
      }
    ];
  };
  en?: {
    title?: string;
    link?: string;
    dropdown?: [
      {
        title?: string;
        link?: string;
      }
    ];
  };
}
