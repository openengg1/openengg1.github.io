export interface Field {
  value: string;
  render: boolean;
}

export interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryName: string;
  region: string;
}

export interface SocialProfile {
  network: string;
  username?: string;
  url?: string;
  render: boolean;
}

export interface Basics {
  name: Field;
  label: Field;
  image: Field;
  email: Field;
  phone: Field;
  url: Field;
  summary: {
    label: string;
    value: string;
    render: boolean;
  };
  location: {
    value: Location;
    render: boolean;
  };
  profiles: {
    value: SocialProfile;
  }[];
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
        brief?: string;
        detail: string;
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
        brief?: string;
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
      src: string;
      caption: {
        title: string;
        description: string;
      };
      render: boolean;
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

export interface Config {
  homepage: string;
  theme: {
    value: string;
    render: boolean;
    meta: {
      showPageNumbers: boolean;
      hideSectionLines: boolean;
      pantherHeaderNameFontSize: number;
      pantherHeaderColumnOneWidth: number;
      pantherHeaderColumnTwoWidth: number;
    };
  };
  analytics: {
    ga: {
      trackingId: string;
      enable: boolean;
    };
  };
  meta: {
    showResumeLink: boolean;
    resume: string;
  };
}

export interface SlugMap {
  [key: string]: {
    [key: string]: {
      position: number;
    };
  };
}
