export const SOCIAL = {
  TWITTER: "twitter",
  FACEBOOK: "facebook",
  LINKEDIN: "linkedin",
} as const;

export type SocialKey = keyof typeof SOCIAL;
export const SOCIAL_ITEMS = Object.values(SOCIAL);
