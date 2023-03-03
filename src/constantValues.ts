export const POSTS_PER_PAGE = 20;
export const USERNAME_REGEX_EXP = /@([A-Z_0-9]{1,16})/gi;
export const PROFILE_FORM_USERNAME_REGEX = /([A-Z_0-9]{1,16})/gi;
export const HASHTAG_REGEX_EXP = /#([A-Z_0-9]+)/gi;
export const URL_REGEX_EXP = /(https?:\/\/\S+)/gi;
export const illegalUsernames = [
  'api',
  'trpc',
  'bookmarks',
  'dev',
  'home',
  'notifications',
  'profile',
  'settings',
  'signin',
  'trending',
  'welcome',
  'about',
];
