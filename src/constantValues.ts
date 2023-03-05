export const POSTS_PER_PAGE = 10;
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
export const defaultAvatarURLs = [
  'https://res.cloudinary.com/dwa8at7sx/image/upload/defaultavatar_ve03ed',
  'https://res.cloudinary.com/dwa8at7sx/image/upload/defaultavatar_ve03ed.png',
];
export const defaultBannerURLs = [
  'https://res.cloudinary.com/dwa8at7sx/image/upload/v1677930500/defaultbanner_hjtdni',
  'https://res.cloudinary.com/dwa8at7sx/image/upload/v1677930500/defaultbanner_hjtdni.png',
];
