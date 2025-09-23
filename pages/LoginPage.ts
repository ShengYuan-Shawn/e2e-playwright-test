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

  async verifyLoginPageUI() {
    await this.usernameInput.isVisible();
    await this.passwordInput.isVisible();
    await this.loginButton.isVisible();
  }

  async loginInvalidUser() {
    await this.usernameInput.fill(
      faker.person.firstName().toLowerCase +
        "_" +
        faker.person.lastName().toLowerCase
    );
    await this.passwordInput.fill(faker.internet.password({ length: 8 }));
    await this.loginButton.click();

    await this.page.waitForTimeout(1000);

    await this.loginErrorMessage.isVisible();
    await expect(this.loginErrorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  }
}
