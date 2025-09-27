import { Locator, Page, expect } from "@playwright/test";
import { LocatorsFactory } from "../factory/LocatorsFactory";
import { faker } from "@faker-js/faker";

export class LoginPage {
  private static readonly LOGIN_ERROR_MESSAGES = {
    PASSWORD_REQUIRED: "Epic sadface: Password is required",
    USERNAME_REQUIRED: "Epic sadface: Username is required",
    USER_LOCKED: "Epic sadface: Sorry, this user has been locked out.",
    INVALID_CREDENTIALS:
      "Epic sadface: Username and password do not match any user in this service",
  } as const;

  readonly page: Page;
  readonly loginLogo: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    const Login = LocatorsFactory.LOGIN_PAGE;

    this.page = page;
    this.loginLogo = page.locator(Login.LOGIN_LOGO);
    this.usernameInput = page.locator(Login.USERNAME_INPUT);
    this.passwordInput = page.locator(Login.PASSWORD_INPUT);
    this.loginButton = page.locator(Login.LOGIN_BUTTON);
    this.loginErrorMessage = page.locator(Login.ERROR_MESSAGE);
  }

  async verifyLoginPage() {
    await expect(this.loginLogo).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async enterRandomUsername() {
    let randomUsername =
      faker.person.firstName().toLowerCase() +
      "_" +
      faker.person.lastName().toLowerCase();

    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill(randomUsername);
  }

  async enterValidUsername(username: string) {
    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill(username);
  }

  async clearUsernameField() {
    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.clear();
  }

  async enterRandomPassword() {
    let randomPassword = faker.internet.password({ length: 8 });

    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(randomPassword);
  }

  async enterValidPassword(password: string) {
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);
  }

  async clearPasswordField() {
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.clear();
  }

  async clickLoginButton() {
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
  }

  async verifyErrorMessage(errorType?: "password" | "username" | "locked") {
    await expect(this.loginErrorMessage).toBeVisible();

    // Mapped Error Message With Key
    const errorMessage = {
      password: LoginPage.LOGIN_ERROR_MESSAGES.PASSWORD_REQUIRED,
      username: LoginPage.LOGIN_ERROR_MESSAGES.USERNAME_REQUIRED,
      locked: LoginPage.LOGIN_ERROR_MESSAGES.USER_LOCKED,
    };

    const expectedMessage = errorType
      ? errorMessage[errorType]
      : LoginPage.LOGIN_ERROR_MESSAGES.INVALID_CREDENTIALS;

    await expect(this.loginErrorMessage).toHaveText(expectedMessage);
  }
}
