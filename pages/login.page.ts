import { Locator, Page, expect } from "@playwright/test";
import { LOGIN_SELECTORS } from "../selectors/index";
import { ERROR_MESSAGES, LoginErrorKey } from "../test-data/app";
import { faker } from "@faker-js/faker";

export class LoginPage {
  readonly page: Page;
  readonly loginLogo: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    const Login = LOGIN_SELECTORS;

    this.page = page;
    this.loginLogo = page.locator(Login.LOGIN_LOGO);
    this.usernameInput = page.locator(Login.USERNAME_INPUT);
    this.passwordInput = page.locator(Login.PASSWORD_INPUT);
    this.loginButton = page.locator(Login.LOGIN_BUTTON);
    this.errorMessage = page.locator(Login.ERROR_MESSAGE);
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

  async verifyErrorMessage(errorType: LoginErrorKey) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(
      ERROR_MESSAGES.LOGIN[errorType],
    );
  }
}
