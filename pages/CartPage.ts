import { Locator, Page, expect } from "@playwright/test";
import { CommonUtils } from "../utils/CommonUtils";
import { Navigation } from "../utils/Navigation";
import { LocatorsFactory } from "../factory/LocatorsFactory";

export class CartPage {
  readonly page: Page;
  readonly commonUtils: CommonUtils;
  readonly navigation: Navigation;
  readonly hamburgerButton: Locator;
  readonly textLogo: Locator;
  readonly cartButton: Locator;
  readonly navigationMenu: Locator;
  readonly closeButton: Locator;
  readonly productText: Locator;
  readonly cartQuantityText: Locator;
  readonly cartDescText: Locator;
  readonly cartFooter: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    const Base = LocatorsFactory.BASE_PAGE;
    const Cart = LocatorsFactory.CART_PAGE;

    this.page = page;
    this.commonUtils = new CommonUtils(page);
    this.navigation = new Navigation(page);
    this.hamburgerButton = page.locator(Base.HAMBURGER_BUTTON);
    this.textLogo = page.locator(Base.TEXT_LOGO);
    this.cartButton = page.locator(Base.CART_BUTTON);
    this.navigationMenu = page.locator(Base.NAVIGATION_MENU);
    this.closeButton = page.locator(Base.CLOSE_BUTTON);
    this.productText = page.locator(Base.PAGE_TITLE);
    this.cartQuantityText = page.locator(Cart.CART_QUANTITY_TEXT),
    this.cartDescText = page.locator(Cart.CART_DESC_TEXT),
    this.cartFooter = page.locator(Cart.CART_FOOTER),
    this.continueShoppingButton = page.locator(Cart.CONTINUE_SHOPPING_BUTTON),
    this.checkoutButton = page.locator(Cart.CHECKOUT_BUTTON)
  }

  async verifyEmptyCartPage() {
    await this.navigation.goToCart();

    await expect(this.hamburgerButton).toBeVisible();
    await expect(this.textLogo).toBeVisible();
    await expect(this.textLogo).toHaveText('Swag Labs');
    await expect(this.cartButton).toBeVisible();

    await expect(this.productText).toBeVisible();
    await expect(this.productText).toHaveText('Your Cart');

    await expect(this.cartQuantityText).toBeVisible();
    await expect(this.cartQuantityText).toHaveText('QTY');
    await expect(this.cartDescText).toBeVisible();
    await expect(this.cartDescText).toHaveText('Description');

    await expect(this.cartFooter).toBeVisible();
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }
}
