import { Locator, Page, expect } from "@playwright/test";
import { CommonUtils } from "../utils/commonUtils";
import { Navigation } from "../utils/navigationUtils";
import { LocatorsFactory, ProductKey } from "../factory/locatorsFactory";
import { ProductDetails } from "../factory/productDetails";

export class CartPage {
  readonly page: Page;
  readonly commonUtils: CommonUtils;
  readonly navigation: Navigation;
  readonly hamburgerButton: Locator;
  readonly textLogo: Locator;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;
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
    this.cartBadge = page.locator(Base.CART_BADGE);
    this.navigationMenu = page.locator(Base.NAVIGATION_MENU);
    this.closeButton = page.locator(Base.CLOSE_BUTTON);
    this.productText = page.locator(Base.PAGE_TITLE);
    this.cartQuantityText = page.locator(Cart.CART_QUANTITY_TEXT);
    this.cartDescText = page.locator(Cart.CART_DESC_TEXT);
    this.cartFooter = page.locator(Cart.CART_FOOTER);
    this.continueShoppingButton = page.locator(Cart.CONTINUE_SHOPPING_BUTTON);
    this.checkoutButton = page.locator(Cart.CHECKOUT_BUTTON);
  }

  async verifyEmptyCart() {
    await this.navigation.goToCart();

    await expect(this.hamburgerButton).toBeVisible();
    await expect(this.textLogo).toBeVisible();
    await expect(this.textLogo).toHaveText("Swag Labs");
    await expect(this.cartButton).toBeVisible();

    await expect(this.productText).toBeVisible();
    await expect(this.productText).toHaveText("Your Cart");

    await expect(this.cartQuantityText).toBeVisible();
    await expect(this.cartQuantityText).toHaveText("QTY");
    await expect(this.cartDescText).toBeVisible();
    await expect(this.cartDescText).toHaveText("Description");

    await expect(this.cartFooter).toBeVisible();
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }

  async getProductDetails(productKey: ProductKey) {
    // Retrieve Product Details xPath From Maps
    const productDetails = ProductDetails.PRODUCT_MAP[productKey];
    const productAddButton =
      LocatorsFactory.PRODUCT_SELECTORS[productKey].ADD_TO_CART_BUTTON;

    // Frame Product Name, Desc, Price xPath
    const productImage = this.page.locator(
      productAddButton +
        "/ancestor::div[@class='inventory_item']//div[@class='inventory_item_img']"
    );
    const productName = this.page.locator(
      productAddButton +
        "/ancestor::div[@class='inventory_item']//div[@class='inventory_item_name ']"
    );
    const productDesc = this.page.locator(
      productAddButton +
        "/ancestor::div[@class='inventory_item']//div[@class='inventory_item_desc']"
    );
    const productPrice = this.page.locator(
      productAddButton +
        "/preceding-sibling::div[@class='inventory_item_price']"
    );

    // Convert to locator
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
  }

  async addProductToCart(productKey: ProductKey) {
    const productAddButton =
      LocatorsFactory.PRODUCT_SELECTORS[productKey].ADD_TO_CART_BUTTON;
    const productRemoveButton =
      LocatorsFactory.PRODUCT_SELECTORS[productKey].REMOVE_BUTTON;

    const addToCartButton = this.page.locator(productAddButton);
    const removeFromCartButton = this.page.locator(productRemoveButton);

    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    await expect(removeFromCartButton).toBeVisible();
    await expect(removeFromCartButton).toContainText("Remove");

    await expect(this.cartBadge).toBeVisible();

    const getCurrentCartValue = await this.commonUtils.getText(this.cartBadge);

    if (parseInt(getCurrentCartValue ?? "0") != 0) {
      await expect(this.cartBadge).toContainText("1");
    }
  }

  async verifyLatestItem() {
    await this.navigation.goToCart();
  }
}
