import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { CART_SELECTORS, PRODUCT_IDS, ProductSelectors } from "../selectors";
import { PRODUCTS } from "../test-data/domain/products";

export class CartPage extends BasePage {
  readonly cartQuantityText: Locator;
  readonly cartDescText: Locator;
  readonly cartProductCard: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  private _cartCount: number = 0;

  get cartCount(): number {
    return this._cartCount;
  }

  set cartCount(count: number) {
    this._cartCount = count;
  }

  constructor(page: Page) {
    super(page);

    const Cart = CART_SELECTORS;

    this.cartQuantityText = page.locator(Cart.QUANTITY_TEXT);
    this.cartDescText = page.locator(Cart.DESC_TEXT);
    this.cartProductCard = page.locator(Cart.PRODUCT_CARD);
    this.continueShoppingButton = page.locator(Cart.CONTINUE_SHOPPING_BUTTON);
    this.checkoutButton = page.locator(Cart.CHECKOUT_BUTTON);
  }

  async navigateToHome() {
    await expect(this.continueShoppingButton).toBeVisible();
    await this.continueShoppingButton.click();
  }

  async verifyEmptyCart() {
    await this.navigateToCart();

    await expect(this.hamburgerButton).toBeVisible();
    await expect(this.textLogo).toBeVisible();
    await expect(this.textLogo).toHaveText("Swag Labs");
    await expect(this.cartButton).toBeVisible();
    await expect(this.cartBadge).not.toBeVisible();

    await expect(this.titleText).toBeVisible();
    await expect(this.titleText).toHaveText("Your Cart");

    await expect(this.cartQuantityText).toBeVisible();
    await expect(this.cartQuantityText).toHaveText("QTY");
    await expect(this.cartDescText).toBeVisible();
    await expect(this.cartDescText).toHaveText("Description");
    await expect(this.cartProductCard).not.toBeVisible();

    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.continueShoppingButton).toContainText(
      "Continue Shopping",
    );

    await expect(this.checkoutButton).toBeVisible();
    await expect(this.checkoutButton).toContainText("Checkout");
  }

  async verifyProductDetails(productKey: keyof typeof PRODUCT_IDS) {
    const productImage = this.page.locator(
      ProductSelectors.getSelectors(productKey).image,
    );
    const productName = this.page.locator(
      ProductSelectors.getSelectors(productKey).name,
    );
    const productDesc = this.page.locator(
      ProductSelectors.getSelectors(productKey).description,
    );
    const productPrice = this.page.locator(
      ProductSelectors.getSelectors(productKey).price,
    );
    const productAddToCart = this.page.locator(
      ProductSelectors.getSelectors(productKey).addToCartButton,
    );
    const productRemoveButton = this.page.locator(
      ProductSelectors.getSelectors(productKey).removeButton,
    );

    await expect(productImage).toBeVisible();

    await expect(productName).toBeVisible();
    await expect(productName).toContainText(PRODUCTS[productKey].name);

    await expect(productDesc).toBeVisible();
    await expect(productDesc).toContainText(PRODUCTS[productKey].description);

    await expect(productPrice).toBeVisible();
    await expect(productPrice).toContainText(`$` + PRODUCTS[productKey].price);

    await expect(productAddToCart).toBeVisible();
    await expect(productAddToCart).toHaveText("Add to cart");
    await expect(productRemoveButton).not.toBeVisible();
  }

  async addProductToCart(productKey: keyof typeof PRODUCT_IDS) {
    const productAddToCart = this.page.locator(
      ProductSelectors.getSelectors(productKey).addToCartButton,
    );
    const productRemoveButton = this.page.locator(
      ProductSelectors.getSelectors(productKey).removeButton,
    );

    await expect(productAddToCart).toBeVisible();
    await productAddToCart.click();
    await expect(productAddToCart).not.toBeVisible();

    await expect(productRemoveButton).toBeVisible();
    await expect(productRemoveButton).toContainText("Remove");

    await expect(this.cartBadge).toBeVisible();

    const currentCartItemCount = await this.commonUtils.getText(this.cartBadge);
    if (parseInt(currentCartItemCount ?? "0") !== 0) {
      await expect(this.cartBadge).toContainText(currentCartItemCount);
    }

    this._cartCount = parseInt(currentCartItemCount);
  }

  async removeProductToCart(productKey: keyof typeof PRODUCT_IDS) {
    const productRemoveButton = this.page.locator(
      ProductSelectors.getSelectors(productKey).removeButton,
    );

    await expect(productRemoveButton).toBeVisible();
    await expect(productRemoveButton).toContainText("Remove");
    await productRemoveButton.click();

    if (this._cartCount > 1) {
      this._cartCount -= 1;
      await expect(this.cartBadge).toBeVisible();
      await expect(this.cartBadge).toContainText(this._cartCount.toString());
    } else {
      await expect(this.cartBadge).not.toBeVisible();
    }
  }

  // async verifyLatestItem(productKey: keyof typeof PRODUCT_IDS) {

  //   const productQuantity = this.page.locator(
  //     productRemoveButton +
  //       "/ancestor::div[@class='cart_item']//div[@class='cart_quantity']",
  //   );

  //   await expect(this.hamburgerButton).toBeVisible();
  //   await expect(this.textLogo).toBeVisible();
  //   await expect(this.textLogo).toHaveText("Swag Labs");
  //   await expect(this.cartButton).toBeVisible();

  //   await expect(this.titleText).toBeVisible();
  //   await expect(this.titleText).toHaveText("Your Cart");

  //   await expect(this.cartQuantityText).toBeVisible();
  //   await expect(this.cartQuantityText).toHaveText("QTY");
  //   await expect(this.cartDescText).toBeVisible();
  //   await expect(this.cartDescText).toHaveText("Description");

  //   await expect(productCard).toBeVisible();

  //   await expect(productQuantity).toBeVisible();
  //   await expect(productQuantity).toHaveText("1");

  //   await expect(productName).toBeVisible();
  //   await expect(productName).toContainText(productDetails.NAME);

  //   await expect(productDesc).toBeVisible();
  //   await expect(productDesc).toContainText(productDetails.DESC);

  //   await expect(productPrice).toBeVisible();
  //   await expect(productPrice).toContainText(productDetails.PRICE);

  //   await expect(removeFromCartButton).toBeVisible();
  //   await expect(removeFromCartButton).toContainText("Remove");
  // }
}
