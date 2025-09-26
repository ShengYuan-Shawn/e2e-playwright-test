import { Locator, Page, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class HomePage {
  readonly page: Page;
  readonly hamburgerButton: Locator;
  readonly navigationMenu: Locator;
  readonly closeButton: Locator;
  readonly textLogo: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hamburgerButton = page.locator(".bm-burger-button");
    this.navigationMenu = page.locator(".bm-menu");
    this.closeButton = page.locator("#react-burger-cross-btn");
    this.textLogo = page.locator(".app_logo");
    this.cartButton = page.locator(".shopping_cart_link");
  }

  async verifyHomePage() {
    await this.hamburgerButton.isVisible();
    await this.textLogo.isVisible();
    await this.cartButton.isVisible();
  }

  async clickHamburgerMenu() {
    await this.hamburgerButton.isVisible();
    await this.hamburgerButton.click();
  }

  async verifyNavigationList() {
    const listItem = ["inventory", "about", "logout", "reset"];

    await this.closeButton.isVisible();
    for (var i = 0; i < listItem.length; i++) {
      await this.page.locator(`${listItem[i]}_sidebar_link`).isVisible();
    }
  }

  async clickCloseButton() {
    await this.closeButton.isVisible();
    await this.closeButton.click();
  }
}
