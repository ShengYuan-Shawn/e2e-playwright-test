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

  private static readonly COPYRIGHT_TEXT =
    "© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy";

  readonly page: Page;
  readonly commonUtils: CommonUtils;
  readonly hamburgerButton: Locator;
  readonly navigationMenu: Locator;
  readonly closeButton: Locator;
  readonly textLogo: Locator;
  readonly cartButton: Locator;
  readonly productFilter: Locator;
  readonly productPrice: Locator;
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
    this.productPrice = page.locator(".inventory_item_price");
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
    await this.page.waitForTimeout(2500);
  }

  async verifyProductListSequence(
    // Validates product list sorting order - defaults to ascending if not specified
    expectedOrder: "ascending" | "descending" = "ascending"
  ) {
    const itemPrices = await this.productPrice.allTextContents();
    const numericPrice = itemPrices.map((price) =>
      parseFloat(price.replace(/[$,\s]/g, ""))
    );

    expect(this.isCorrectOrder(numericPrice, expectedOrder)).toBeTruthy();
  }

  private isCorrectOrder(
    prices: number[],
    order: "ascending" | "descending"
  ): boolean {
    // Compare adjacent elements to verify sort order (iterate to n-1 to avoid index out of bounds)
    for (let i = 0; i < prices.length - 1; i++) {
      if (order === "ascending" && prices[i] > prices[i + 1]) {
        return false;
      }
      if (order === "descending" && prices[i] < prices[i + 1]) {
        return false;
      }
    }
    return true;
  }

  async verifyFooter() {
    await this.commonUtils.scrollToBottom();
    await expect(this.bottomFooter).toBeVisible();
    for (const item of HomePage.SOCIAL_ITEMS) {
      await expect(this.socialListItem(item)).toBeVisible();
    }
    await expect(this.termsText).toBeVisible();
    await expect(this.termsText).toHaveText(HomePage.COPYRIGHT_TEXT);
  }
}
