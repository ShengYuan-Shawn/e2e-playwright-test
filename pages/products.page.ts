import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import {
  CART_SELECTORS,
  CartSelectors,
  PRODUCT_IDS,
  ProductSelectors,
} from "../selectors";
import { PRODUCTS } from "../test-data/domain/products";

export class CartPage extends BasePage {
  readonly cartQuantityText: Locator;
  readonly cartDescText: Locator;
  readonly cartProductCard: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  _cartCount: number = 0;

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

    await expect(this.cartBadge).not.toBeVisible();

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

  async verifyProductDetails(productKeys: (keyof typeof PRODUCT_IDS)[]) {
    for (const productKey of productKeys) {
      const product = await this.productSelector(productKey);
      const productData = PRODUCTS[productKey];

      await expect(product.productName).toBeVisible();
      await expect(product.productName).toContainText(productData.name);

      await expect(product.productDesc).toBeVisible();
      await expect(product.productDesc).toContainText(productData.description);

      await expect(product.productPrice).toBeVisible();
      await expect(product.productPrice).toContainText(`$` + productData.price);

      await expect(product.productAddToCart).toBeVisible();
      await expect(product.productAddToCart).toHaveText("Add to cart");
      await expect(product.productRemoveButton).not.toBeVisible();
    }
  }

  async addProduct(productKeys: (keyof typeof PRODUCT_IDS)[]) {
    for (const productKey of productKeys) {
      const product = await this.productSelector(productKey);

      await expect(product.productAddToCart).toBeVisible();
      await product.productAddToCart.click();
      await expect(product.productAddToCart).not.toBeVisible();

      await expect(product.productRemoveButton).toBeVisible();
      await expect(product.productRemoveButton).toContainText("Remove");

      await expect(this.cartBadge).toBeVisible();

      const currentCartItemCount = await this.commonUtils.getText(
        this.cartBadge,
      );
      if (parseInt(currentCartItemCount ?? "0") !== 0) {
        await expect(this.cartBadge).toContainText(currentCartItemCount);
      }

      this._cartCount = parseInt(currentCartItemCount);
    }
  }

  async removeProduct(productKeys: (keyof typeof PRODUCT_IDS)[]) {
    for (const productKey of productKeys) {
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
  }

  async verifyCart() {
    await expect(this.hamburgerButton).toBeVisible();
    await expect(this.textLogo).toBeVisible();
    await expect(this.textLogo).toHaveText("Swag Labs");
    await expect(this.cartButton).toBeVisible();

    await expect(this.titleText).toBeVisible();
    await expect(this.titleText).toHaveText("Your Cart");

    await expect(this.cartQuantityText).toBeVisible();
    await expect(this.cartQuantityText).toHaveText("QTY");
    await expect(this.cartDescText).toBeVisible();
    await expect(this.cartDescText).toHaveText("Description");
  }

  async verifyCartItems(productKeys: (keyof typeof PRODUCT_IDS)[]) {
    const cartItems = this.page.locator('[data-test="inventory-item"]');
    const count = await cartItems.count();
    expect(count).toBe(this._cartCount);

    for (const productKey of productKeys) {
      const cart = await this.cartSelector(productKey);
      const product = await this.productSelector(productKey);
      const productData = PRODUCTS[productKey];

      await expect(cart.cartItem).toBeVisible();

      await expect(cart.cartQuantity).toBeVisible();
      await expect(cart.cartQuantity).toHaveText("1");

      await expect(cart.cartName).toBeVisible();
      await expect(cart.cartName).toContainText(productData.name);

      await expect(cart.cartDesc).toBeVisible();
      await expect(cart.cartDesc).toContainText(productData.description);

      await expect(cart.cartPrice).toBeVisible();
      await expect(cart.cartPrice).toContainText(`$` + productData.price);

      await expect(product.productRemoveButton).toBeVisible();
      await expect(product.productRemoveButton).toContainText("Remove");
    }
  }

  private async productSelector(productKey: keyof typeof PRODUCT_IDS) {
    const selectors = ProductSelectors.getSelectors(productKey);

    const productImage = this.page.locator(selectors.image);
    const productName = this.page.locator(selectors.name);
    const productDesc = this.page.locator(selectors.description);
    const productPrice = this.page.locator(selectors.price);
    const productAddToCart = this.page.locator(selectors.addToCartButton);
    const productRemoveButton = this.page.locator(selectors.removeButton);

    return {
      productImage,
      productName,
      productDesc,
      productPrice,
      productAddToCart,
      productRemoveButton,
    };
  }

  private async cartSelector(productKey: keyof typeof PRODUCT_IDS) {
    const selectors = CartSelectors.getSelectors(productKey);

    const cartItem = this.page.locator(selectors.item);
    const cartQuantity = this.page.locator(selectors.quantity);
    const cartName = this.page.locator(selectors.name);
    const cartDesc = this.page.locator(selectors.description);
    const cartPrice = this.page.locator(selectors.price);

    return {
      cartItem,
      cartQuantity,
      cartName,
      cartDesc,
      cartPrice,
    };
  }
}
