export const FILTERS = {
  AZ: "az",
  ZA: "za",
  LOW_TO_HIGH: "lohi",
  HIGH_TO_LOW: "hilo",
} as const;

export type FilterKey = keyof typeof FILTERS;
export const FILTER_OPTIONS = Object.values(FILTERS);
