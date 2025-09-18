import { combineReducers, AnyAction } from 'redux';
import {
  ProfileWeb,
  ProfileSectionsWeb,
  Basics,
  Config,
  SlugMap,
} from '../types/profileWeb';
import profileWebData from '../preprocessors/profile_web.json';

export interface StoreState {
  profileWeb: ProfileWeb;
  basics: Basics;
  sections: ProfileSectionsWeb;
  config: Config;
  slugMap: SlugMap;
}


const { basics, config, slugMap, ...sections } = profileWebData as ProfileWeb;

const initialProfileWebState: ProfileWeb = profileWebData as ProfileWeb;
const initialBasicsState: Basics = basics;
const initialSectionsState: ProfileSectionsWeb = sections;
const initialConfigState: Config = config;
const initialSlugMapState: SlugMap = slugMap;

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

