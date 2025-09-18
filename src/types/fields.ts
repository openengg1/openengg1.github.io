export interface Meta {
  showPageNumbers?: boolean;
  hideSectionLines?: boolean;
  pantherHeaderNameFontSize?: number;
  pantherHeaderColumnOneWidth?: number;
  pantherHeaderColumnTwoWidth?: number;
}

export interface Theme {
  value: string;
  render: boolean;
  meta?: Meta;
}

export interface Analytics {
  ga: {
    trackingId: string;
    enable: boolean;
  };
}

export interface ConfigMeta {
  showResumeLink: boolean;
  resume: string;
}

export interface Config {
  homepage: string;
  theme: Theme;
  analytics: Analytics;
  meta: ConfigMeta;
}

export enum SocialProfileTypes {
  GoogleScholar = 'googlescholar',
  Github = 'github',
  Linkedin = 'linkedin',
  Twitter = 'twitter',
  Vimeo = 'vimeo',
  Facebook = 'facebook',
  Gitlab = 'gitlab',
  Twitch = 'twitch',
  Youtube = 'youtube',
}

export interface SocialProfile {
  value: {
    network: string;
    render: boolean;
    url?: string;
    username?: string;
  };
}

export interface Basics {
  name: { value: string; render: boolean };
  label: { value: string; render: boolean };
  image: { value: string; render: boolean };
  email: { value: string; render: boolean };
  phone: { value: string; render: boolean };
  url: { value: string; render: boolean };
  summary: { label: string; value: string; render: boolean };
  location: {
    value: {
      address: string;
      postalCode: string;
      city: string;
      countryName: string;
      region: string;
    };
    render: boolean;
  };
  profiles: SocialProfile[];
}

export interface Work {
  label: string;
  rank: number;
  list: {
    value: {
      name: string;
      location: string;
      brief: string;
      position: string;
      url: string;
      startDate: string;
      endDate: string;
      thumbnail: string;
      active: boolean;
      highlights: {
        detail: string;
        brief?: string;
      }[];
      render: boolean;
    };
  }[];
}

export interface Education {
  label: string;
  rank: number;
  list: {
    value: {
      institution: string;
      url: string;
      major: string;
      minor: string;
      degree: string;
      grade: number;
      gradeTotal: number;
      courses: string[];
      render: boolean;
    };
  }[];
}

export interface Project {
  label: string;
  rank: number;
  maxItemsToRender: number;
  list: {
    value: {
      name: string;
      description: string;
      team: string;
      note: string;
      thumbnail: string;
      highlights: {
        brief: string;
        detail: string;
      }[];
      keywords: string[];
      startDate: string;
      endDate: string;
      url: string;
      roles: string[];
      type: string;
      webPage: {
        slug: string;
        detail: string;
      };
      render: boolean;
    };
  }[];
}

export enum PublicationTypes {
  Article = 'article',
  Book = 'book',
  InConference = 'in conference',
  InProceedings = 'in proceedings',
  Thesis = 'thesis',
}

export const ThesisTypes = PublicationTypes;

export interface Publication {
  label: string;
  rank: number;
  maxItemsToRender: number;
  list: {
    value: {
      type: string;
      author: string;
      title: string;
      journal: string;
      volume: number;
      year: number;
      number: number;
      pages: string;
      thumbnail: string;
      url: string;
      render: boolean;
    };
  }[];
}

export interface Award {
  label: string;
  rank: number;
  list: {
    value: {
      title: string;
      date: string;
      awarder: string;
      summary: string;
      render: boolean;
    };
  }[];
}

export interface Gallery {
  label: string;
  rank: number;
  list: {
    value: {
      type: string;
      src?: string;
      caption?: {
        title: string;
        description: string;
      };
      render: boolean;
      platform?: string;
      videoId?: string;
    };
  }[];
}

export interface Skill {
  label: string;
  rank: number;
  list: {
    value: {
      name: string;
      level: string;
      keywords: string[];
      render: boolean;
    };
  }[];
}

export interface Language {
  label: string;
  rank: number;
  list: {
    value: {
      language: string;
      fluency: string;
      render: boolean;
    };
  }[];
}

export interface Interest {
  label: string;
  rank: number;
  list: {
    value: {
      name: string;
      keywords: string[];
      render: boolean;
    };
  }[];
}

export interface Reference {
  label: string;
  rank: number;
  list: {
    value: {
      name: string;
      title: string;
      affiliation: string;
      address: string;
      postalCode: string;
      city: string;
      countryName: string;
      region: string;
      phoneNumber: string;
      email: string;
      render: boolean;
    };
  }[];
}

export interface Custom {
  label: string;
  value?: string;
  webPage?: {
    slug: string;
    detail: string;
  };
  render: boolean;
}

export interface SlugMap {
  [key: string]: {
    [key: string]: {
      position: number;
    };
  };
}

export enum ProfileField {
  Work = 'work',
  Education = 'education',
  Projects = 'projects',
  Publications = 'publications',
  Awards = 'awards',
  Gallery = 'gallery',
  Skills = 'skills',
  Languages = 'languages',
  Interests = 'interests',
  References = 'references',
  Custom = 'custom',
}

