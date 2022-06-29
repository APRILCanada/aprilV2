export class Job {
  id?: string;
  isActive?: string;
  picture?: string;
  en: {
    title?: string;
    pictureAlt: string;
    aprilDesc: {
      title?: string;
      desc?: string;
    };
    jobSummary: {
      title?: string;
      desc?: string;
    };
    requirement: {
      title?: string;
      desc?: string;
    };
    skills: {
      title?: string;
      desc?: string;
    };
    aprilAdvantages: {
      title?: string;
      desc?: string;
    };
    city?: string;
  };
  fr: {
    title?: string;
    pictureAlt: string;
    aprilDesc: {
      title?: string;
      desc?: string;
    };
    jobSummary: {
      title?: string;
      desc?: string;
    };
    requirement: {
      title?: string;
      desc?: string;
    };
    skills: {
      title?: string;
      desc?: string;
    };
    aprilAdvantages: {
      title?: string;
      desc?: string;
    };
    city?: string;
  };
}
