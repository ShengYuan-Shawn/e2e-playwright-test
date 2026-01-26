import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import {
  CART_SELECTORS,
  ProductSelectors,
} from "../selectors/index";
import { PRODUCTS, ProductKey } from "../test-data/index";

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

  async verifyProductDetails(productKey: ProductKey) {
    // Retrieve Product Details xPath From Maps
    const productDetails = PRODUCTS[productKey];
    const productAddButton = ProductSelectors.addToCart(productKey);

    // Frame Product Image, Name, Desc, Price xPath
    const productImage = this.page.locator(
      productAddButton +
        "/ancestor::div[@class='inventory_item']//div[@class='inventory_item_img']",
    );
    const productName = this.page.locator(
      productAddButton +
        "/ancestor::div[@class='inventory_item']//div[@class='inventory_item_name ']",
    );
    const productDesc = this.page.locator(
      productAddButton +
        "/ancestor::div[@class='inventory_item']//div[@class='inventory_item_desc']",
    );
    const productPrice = this.page.locator(
      productAddButton +
        "/preceding-sibling::div[@class='inventory_item_price']",
    );

    const addToCartButton = this.page.locator(productAddButton);

    await expect(productImage).toBeVisible();

    await expect(productName).toBeVisible();
    await expect(productName).toContainText(productDetails.NAME);

    await expect(productDesc).toBeVisible();
    await expect(productDesc).toContainText(productDetails.DESC);

    await expect(productPrice).toBeVisible();
    await expect(productPrice).toContainText(productDetails.PRICE);

    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toHaveText("Add to cart");
    await expect(addToCartButton).not.toHaveText("Remove");
  }

  async addProductToCart(productKey: ProductKey) {
    const productAddButton = ProductSelectors.addToCart(productKey);
    const productRemoveButton = ProductSelectors.remove(productKey);

    const addToCartButton = this.page.locator(productAddButton);
    const removeFromCartButton = this.page.locator(productRemoveButton);

    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();
    await expect(addToCartButton).not.toBeVisible();

    await expect(removeFromCartButton).toBeVisible();
    await expect(removeFromCartButton).toContainText("Remove");

    await expect(this.cartBadge).toBeVisible();

    const currentCartItemCount = await this.commonUtils.getText(this.cartBadge);
    if (parseInt(currentCartItemCount ?? "0") !== 0) {
      await expect(this.cartBadge).toContainText(currentCartItemCount);
    }

    this._cartCount = parseInt(currentCartItemCount);
  }

  async removeProductToCart(productKey: ProductKey) {
    const productRemoveButton = ProductSelectors.remove(productKey);

    const removeFromCartButton = this.page.locator(productRemoveButton);

    await expect(removeFromCartButton).toBeVisible();
    await expect(removeFromCartButton).toContainText("Remove");
    await removeFromCartButton.click();

    if (this._cartCount > 1) {
      this._cartCount -= 1;
      await expect(this.cartBadge).toBeVisible();
      await expect(this.cartBadge).toContainText(this._cartCount.toString());
    } else {
      await expect(this.cartBadge).not.toBeVisible();
    }
  }

  async verifyLatestItem(productKey: ProductKey) {
    // Retrieve Product Details xPath From Maps
    const productDetails = PRODUCTS[productKey];
    const productRemoveButton = ProductSelectors.remove(productKey);

    // Frame Product Product Card, Name, Desc, Price xPath
    const productCard = this.page.locator(
      productRemoveButton + "/ancestor::div[@class='cart_item']",
    );
    const productQuantity = this.page.locator(
      productRemoveButton +
        "/ancestor::div[@class='cart_item']//div[@class='cart_quantity']",
    );
    const productName = this.page.locator(
      productRemoveButton +
        "/ancestor::div[@class='cart_item_label']//div[@class='inventory_item_name']",
    );
    const productDesc = this.page.locator(
      productRemoveButton +
        "/ancestor::div[@class='cart_item_label']//div[@class='inventory_item_desc']",
    );
    const productPrice = this.page.locator(
      productRemoveButton +
        "/preceding-sibling::div[@class='inventory_item_price']",
    );

    const removeFromCartButton = this.page.locator(productRemoveButton);

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

    await expect(productCard).toBeVisible();

    await expect(productQuantity).toBeVisible();
    await expect(productQuantity).toHaveText("1");

    await expect(productName).toBeVisible();
    await expect(productName).toContainText(productDetails.NAME);

    await expect(productDesc).toBeVisible();
    await expect(productDesc).toContainText(productDetails.DESC);

    await expect(productPrice).toBeVisible();
    await expect(productPrice).toContainText(productDetails.PRICE);

    await expect(removeFromCartButton).toBeVisible();
    await expect(removeFromCartButton).toContainText("Remove");
  }
}
