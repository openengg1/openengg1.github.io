import { combineReducers, AnyAction } from 'redux';
import {
  ProfileWeb,
  ProfileSectionsWeb,
  Basics,
  Config,
} from '../types/profileWeb';
import profileWebData from '../preprocessors/profile_web.json';
import { omit } from 'lodash';

export interface StoreState {
  profileWeb: ProfileWeb;
  basics: Basics;
  profileSections: ProfileSectionsWeb;
  config: Config;
}

const initialProfileWebState: ProfileWeb = profileWebData as ProfileWeb;
const initialBasicsState: Basics = profileWebData.basics as Basics;
const initialProfileSectionsState: ProfileSectionsWeb = omit(
  { ...profileWebData },
  ['basics', 'config']
) as ProfileSectionsWeb;
const initialConfigState: Config = profileWebData.config as Config;

// Reducers need to follow the (state, action) => newState pattern to satisfy TypeScript
const profileWeb = (
  state: ProfileWeb = initialProfileWebState,
  action: AnyAction
): ProfileWeb => {
  switch (action.type) {
    default:
      return state;
  }
};

const basics = (
  state: Basics = initialBasicsState,
  action: AnyAction
): Basics => {
  switch (action.type) {
    default:
      return state;
  }
};

const profileSections = (
  state: ProfileSectionsWeb = initialProfileSectionsState,
  action: AnyAction
): ProfileSectionsWeb => {
  switch (action.type) {
    default:
      return state;
  }
};

const config = (
  state: Config = initialConfigState,
  action: AnyAction
): Config => {
  switch (action.type) {
    default:
      return state;
  }
};

export const reducers = combineReducers<StoreState>({
  profileWeb,
  basics,
  profileSections,
  config,
});

