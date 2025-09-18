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

const { basics: basicsData, config: configData, slugMap: slugMapData, ...sectionsData } = profileWebData as ProfileWeb;

const initialProfileWebState: ProfileWeb = profileWebData as ProfileWeb;
const initialBasicsState: Basics = basicsData;
const initialSectionsState: ProfileSectionsWeb = sectionsData;
const initialConfigState: Config = configData;
const initialSlugMapState: SlugMap = slugMapData;

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
