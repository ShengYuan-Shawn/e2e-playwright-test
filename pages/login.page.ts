import { Locator, Page, expect } from "@playwright/test";
import { LocatorsFactory } from "../factory/locatorsFactory";
import { faker } from "@faker-js/faker";

export class LoginPage {
  readonly page: Page;
  readonly loginLogo: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  private static readonly ERROR_MESSAGES = {
    PASSWORD_REQUIRED: "Epic sadface: Password is required",
    USERNAME_REQUIRED: "Epic sadface: Username is required",
    USER_LOCKED: "Epic sadface: Sorry, this user has been locked out.",
    INVALID_CREDENTIALS:
      "Epic sadface: Username and password do not match any user in this service",
  } as const;

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

  async verifyErrorMessage(errorType: keyof typeof LoginPage.ERROR_MESSAGES) {
    await expect(this.loginErrorMessage).toBeVisible();
    await expect(this.loginErrorMessage).toContainText(
      LoginPage.ERROR_MESSAGES[errorType]
    );
  }
}
