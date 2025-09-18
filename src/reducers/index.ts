import { combineReducers, AnyAction } from 'redux';
import {
  ProfileWeb,
  ProfileSectionsWeb,
  Basics,
  Config,
  SlugMap,
} from '../types/profileWeb';
import profileWebData from '../preprocessors/profile_web.json';
import { omit } from 'lodash';

export interface StoreState {
  profileWeb: ProfileWeb;
  basics: Basics;
  sections: ProfileSectionsWeb;
  config: Config;
  slugMap: SlugMap;
}

const initialProfileWebState: ProfileWeb = profileWebData as any;
const initialBasicsState: Basics = profileWebData.basics as any;
const initialSectionsState: ProfileSectionsWeb = omit(
  { ...profileWebData },
  ['basics', 'config', 'slugMap']
) as any;
const initialConfigState: Config = profileWebData.config as any;
const initialSlugMapState: SlugMap = profileWebData.slugMap as any;

const profileWeb = (
  state: ProfileWeb = initialProfileWebState,
  action: AnyAction
): ProfileWeb => {
  return state;
};

const basics = (
  state: Basics = initialBasicsState,
  action: AnyAction
): Basics => {
  return state;
};

const sections = (
  state: ProfileSectionsWeb = initialSectionsState,
  action: AnyAction
): ProfileSectionsWeb => {
  return state;
};

const config = (
  state: Config = initialConfigState,
  action: AnyAction
): Config => {
  return state;
};

const slugMap = (
  state: SlugMap = initialSlugMapState,
  action: AnyAction
): SlugMap => {
  return state;
};

export const reducers = combineReducers<StoreState>({
  profileWeb,
  basics,
  sections,
  config,
  slugMap,
});

