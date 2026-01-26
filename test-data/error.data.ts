// test-data/errors.data.ts
export const ERROR_MESSAGES = {
  LOGIN: {
    USERNAME_REQUIRED: "Epic sadface: Username is required",
    PASSWORD_REQUIRED: "Epic sadface: Password is required",
    INVALID_CREDENTIALS:
      "Epic sadface: Username and password do not match any user in this service",
    LOCKED_USER: "Epic sadface: Sorry, this user has been locked out.",
  },
  CHECKOUT: {
    FIRSTNAME_REQUIRED: "Error: First Name is required",
    LASTNAME_REQUIRED: "Error: Last Name is required",
    POSTALCODE_REQUIRED: "Error: Postal Code is required",
  },
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
