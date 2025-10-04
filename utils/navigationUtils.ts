import { Locator, Page, expect } from "@playwright/test";
import { LocatorsFactory } from "../factory/locatorsFactory";

export class Navigation {
  readonly page: Page;
  readonly cartButton: Locator;

  constructor(page: Page) {
    const Base = LocatorsFactory.BASE_PAGE;

    this.page = page;
    this.cartButton = page.locator(Base.CART_BUTTON);
  }

  async goToCart() {
    await expect(this.cartButton).toBeVisible();
    await this.cartButton.click()
  }
}
