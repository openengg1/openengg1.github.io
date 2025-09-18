import {
  ProfileSectionsWeb,
  ProfileSectionsWebSkeleton,
} from '../types/profileWeb';
import _ from 'lodash';

export const getProfileRankings = (profile: ProfileSectionsWeb) => {
  const profileRankings: ProfileSectionsWebSkeleton = {};
  for (const key in profile) {
    if (Object.prototype.hasOwnProperty.call(profile, key)) {
      let r = _.get(profile, [key, 'rank']);
      let rank: number = r ? r : 9999;
      profileRankings[key] = { rank: rank };
    }
  }

  const sections = Object.keys(profile);
  const rankedSections = sections.sort((a, b) => {
    return (profileRankings[a].rank || 9999) - (profileRankings[b].rank || 9999);
  });

  return rankedSections;
};

