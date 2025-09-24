import { Locator, Page, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.loginErrorMessage = page.locator('[data-test="error"]');
  }

  async verifyLoginPage() {
    await this.usernameInput.isVisible();
    await this.passwordInput.isVisible();
    await this.loginButton.isVisible();
  }

  async inputRandomUsername() {
    var randomUsername =
      faker.person.firstName().toLowerCase +
      "_" +
      faker.person.lastName().toLowerCase;

    await this.usernameInput.isVisible();
    await this.usernameInput.fill(randomUsername);
  }

  async inputValidUsername(username) {
    await this.usernameInput.isVisible();
    await this.usernameInput.fill(username);
  }

  async clearUsernameInput() {
    await this.usernameInput.clear();
  }

  async inputRandomPassword() {
    var randomPassword = faker.internet.password({ length: 8 });

    await this.passwordInput.isVisible();
    await this.passwordInput.fill(randomPassword);
  }

  async inputValidPassword(password) {
    await this.passwordInput.isVisible();
    await this.passwordInput.fill(password);
  }

  async clearPasswordInput() {
    await this.passwordInput.clear();
  }

  async loginUser() {
    await this.loginButton.click();
  }

  async errorMessageValidation(errorType?: string) {
    await this.page.waitForTimeout(5000);
    await this.loginErrorMessage.isVisible();

    if (errorType && errorType.toLowerCase() === "password") {
      await expect(this.loginErrorMessage).toHaveText(
        "Epic sadface: Password is required"
      );
    } else if (errorType && errorType.toLowerCase() === "username") {
      await expect(this.loginErrorMessage).toHaveText(
        "Epic sadface: Username is required"
      );
    } else if (errorType && errorType.toLowerCase() === "locked") {
      await expect(this.loginErrorMessage).toHaveText(
        "Epic sadface: Sorry, this user has been locked out."
      );
    } else {
      await expect(this.loginErrorMessage).toHaveText(
        "Epic sadface: Username and password do not match any user in this service"
      );
    }
  }
}
