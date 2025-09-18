import {
  Basics,
  Work,
  Education,
  Project,
  Publication,
  Award,
  Gallery,
  Skill,
  Language,
  Interest,
  Reference,
  Custom,
  Config,
  SlugMap,
} from './fields';

export interface ProfileSectionsWeb {
  [key: string]:
    | Work
    | Education
    | Project
    | Publication
    | Award
    | Gallery
    | Skill
    | Language
    | Interest
    | Reference
    | Custom[]
    | undefined;
  work?: Work;
  education?: Education;
  projects?: Project;
  publications?: Publication;
  awards?: Award;
  gallery?: Gallery;
  skills?: Skill;
  languages?: Language;
  interests?: Interest;
  references?: Reference;
  custom?: Custom[];
}

export interface ProfileSectionsWebSkeleton {
  [key: string]: {
    rank?: number;
    label?: string;
    render?: boolean;
  };
}

export interface ProfileWeb extends ProfileSectionsWeb {
  config: Config;
  basics: Basics;
  slugMap: SlugMap;
}

