export const NAVIGATION = {
    INVENTORY: "inventory",
    ABOUT: "about",
    LOGOUT: "logout",
    RESET: "reset",
} as const;

export type NavigationKey = keyof typeof NAVIGATION
export const NAV_ITEMS = Object.values(NAVIGATION);