import { Page, Locator, expect } from "@playwright/test";
import { CommonUtils } from "../utils/commonUtils";

import { LocatorsFactory } from "../factory/locatorsFactory";

export class BasePage {
  readonly page: Page;
  readonly commonUtils: CommonUtils;

  readonly hamburgerButton: Locator;
  readonly textLogo: Locator;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;
  readonly navigationMenu: Locator;
  readonly closeButton: Locator;
  readonly titleText: Locator;
  readonly pageFooter: Locator;
  readonly termsText: Locator;

  constructor(page: Page) {
    const Base = LocatorsFactory.BASE_PAGE;

    this.page = page;
    this.commonUtils = new CommonUtils(page);

    this.hamburgerButton = page.locator(Base.HAMBURGER_BUTTON);
    this.textLogo = page.locator(Base.TEXT_LOGO);
    this.cartButton = page.locator(Base.CART_BUTTON);
    this.cartBadge = page.locator(Base.CART_BADGE);
    this.navigationMenu = page.locator(Base.NAVIGATION_MENU);
    this.closeButton = page.locator(Base.CLOSE_BUTTON);
    this.titleText = page.locator(Base.PAGE_TITLE);
    this.pageFooter = page.locator(Base.PAGE_FOOTER);
    this.termsText = page.locator(Base.TERMS_TEXT);
  }

  async navaigateToCart() {
    await expect(this.cartButton).toBeVisible();
    await this.cartButton.click();
  }
}
