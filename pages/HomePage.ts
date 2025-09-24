import { Locator, Page, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class HomePage {
  readonly page: Page;
  readonly hamburgerButton: Locator;
  readonly textLogo: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hamburgerButton = page.locator(".bm-burger-button");
    this.textLogo = page.locator(".app_logo");
    this.cartButton = page.locator(".shopping_cart_link");
  }

  async verifyHomePage() {
    await this.hamburgerButton.isVisible();
    await this.textLogo.isVisible();
    await this.cartButton.isVisible();
  }
}
