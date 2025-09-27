import { Locator, Page, expect } from "@playwright/test";
import { CommonUtils } from "../utils/CommonUtils";

export class HomePage {
  private static readonly NAVIGATION_ITEMS = [
    "inventory",
    "about",
    "logout",
    "reset",
  ];
  private static readonly FILTER_OPTIONS = ["az", "za", "lohi", "hilo"];
  private static readonly SOCIAL_ITEMS = ["twitter", "facebook", "linkedin"];

  readonly page: Page;
  readonly commonUtils: CommonUtils;
  readonly hamburgerButton: Locator;
  readonly navigationMenu: Locator;
  readonly closeButton: Locator;
  readonly textLogo: Locator;
  readonly cartButton: Locator;
  readonly productFilter: Locator;
  readonly bottomFooter: Locator;
  readonly termsText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commonUtils = new CommonUtils(page);
    this.hamburgerButton = page.locator(".bm-burger-button");
    this.navigationMenu = page.locator(".bm-menu");
    this.closeButton = page.locator("#react-burger-cross-btn");
    this.textLogo = page.locator(".app_logo");
    this.cartButton = page.locator(".shopping_cart_link");
    this.productFilter = page.locator(".product_sort_container");
    this.bottomFooter = page.locator(".footer");
    this.termsText = page.locator(".footer_copy");
  }

  // Dynamic Locator Handler
  navigationListItem(item: string): Locator {
    return this.page.locator(`#${item}_sidebar_link`);
  }

  productFilterListItem(item: string): Locator {
    return this.page.locator(`option[value=${item}]`);
  }

  socialListItem(item: string): Locator {
    return this.page.locator(`.social_${item}`);
  }

  async verifyHomePageHeader() {
    await expect(this.hamburgerButton).toBeVisible();
    await expect(this.textLogo).toBeVisible();
    await expect(this.cartButton).toBeVisible();
  }

  async clickHamburgerMenu() {
    await expect(this.hamburgerButton).toBeVisible();
    await this.hamburgerButton.click();
  }

  async verifyNavigationList() {
    await expect(this.closeButton).toBeVisible();
    for (const item of HomePage.NAVIGATION_ITEMS) {
      await expect(this.navigationListItem(item)).toBeVisible();
    }
  }

  async clickCloseButton() {
    await expect(this.closeButton).toBeVisible();
    await this.closeButton.click();
  }

  async verifyProductFilter() {
    await expect(this.productFilter).toBeVisible();
    await this.productFilter.click();
    for (const item of HomePage.FILTER_OPTIONS) {
      await expect(this.productFilterListItem(item)).toBeAttached();
      await this.verifyFilterOptionText(item);
    }
  }

  private async verifyFilterOptionText(option: string) {
    const optionTextMap: Record<string, string> = {
      az: "Name (A to Z)",
      za: "Name (Z to A)",
      lohi: "Price (low to high)",
      hilo: "Price (high to low)",
    };

    await expect(this.productFilterListItem(option)).toHaveText(
      optionTextMap[option]
    );
  }

  async selectFilterOption(option: "az" | "za" | "lohi" | "hilo") {
    await expect(this.productFilter).toBeVisible();
    await this.productFilter.click();

    await expect(this.productFilterListItem(option)).toBeAttached();
    await this.productFilter.selectOption(option);
  }

  async verifyFooter() {
    await this.commonUtils.scrollToBottom();
    await expect(this.bottomFooter).toBeVisible();
    for (const item of HomePage.SOCIAL_ITEMS) {
      await expect(this.socialListItem(item)).toBeVisible();
    }
    await expect(this.termsText).toBeVisible();
    await expect(this.termsText).toHaveText(
      "© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy"
    );
  }
}
